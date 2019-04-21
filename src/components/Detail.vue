<template>
<div>
  <Card id="topSide" :bordered="false">
    <Icon type="ios-arrow-back" id="back" @click="$router.go(-1)"></Icon>动态详情
  </Card>
  <Card id="detailContent" dis-hover :bordered="false">
    <Row>
      <Col span="4">
      <div id="head"><img :src="'/api/img/' + detail.head" /></div>
      </Col>
      <Col span="20" style="height:40px;">
      <Row>
        <Col span="12">{{detail.nickname}}</Col>
        <Col span="12" style="text-align:right;">{{detail.location}}</Col>
      </Row>
      <Row>
        <Col style="font-size: 12px;color:#bbb;line-height: 25px;padding-bottom: 0px;height: 20px;">{{format(detail.publish_time)}}</Col>
      </Row>
      </Col>
    </Row>
    <div v-if="detail.article_type==='转发'">
      <Row style="margin-top:10px">
        <Col>
        <div id="desc" ref="desc">{{detail.content}}</div>
        </Col>
      </Row>
      <Row style="margin-top:10px" @click.native="$router.push({path:'/Detail', query: {articleId: detail.transmit_id}})">
        <Col span="8" style="height:100px;width:33.3333%" v-if="detail.transmitPicture.length!=0"><img v-if="detail.transmitPicture.length!=0" :src="'/api/img/' + detail.transmitPicture[0].picture_url" style="height:inherit;width:100%" /></Col>
        <Col span="16" id="transmit-content" :class="[detail.transmitPicture.length ? '' : imgNotExist]"><span style="color:blue">{{detail.transmit_nickname}}:</span>{{detail.transmit_content}}</Col>
      </Row>
    </div>
    <div v-if="detail.article_type==='原创'">
      <Row style="margin-top:10px">
        <Col>
        <div ref="desc" style="border: 0;width: 100%;color:inherit;word-break:break-all;white-space:pre-wrap;text-align:justify">{{detail.content}}</div>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col v-for="(item, imgIndex) in detail.articlePicture" :key="imgIndex" span="8" style="height:100px;width:33.3333%"><img :src="'/api/img/' + item.picture_url" style="height:inherit;width:100%" /></Col>
      </Row>
      <Row style="margin:10px auto;">
        <Col span="8" style="text-align:center">
        <i class="fa fa-thumbs-o-up" v-if="!detail.praise_state" @click="praise()"></i>
        <i class="fa fa-thumbs-up" v-if="detail.praise_state" @click="praise()"></i>
        {{" " + detail.praise_count}}
        </Col>
        <Col span="8" style="text-align:center">
        <i class="fa fa-commenting-o" @click="commentModal=true"></i>
        {{" " + detail.comment_count}}
        </Col>
        <Col span="8" style="text-align:center">
        <i class="fa fa-external-link" @click="transmitModal=true"></i>
        {{" " + detail.transmit_count}}
        </Col>
      </Row>
    </div>
    <Row v-for="(item, index) in detail.comments" :key="index" style="padding:5px 0 10px;border-top:1px solid #eee;">
      <Row>
        <Col span="4">
        <div id="head"><img :src="item.comment_user_head" /></div>
        </Col>
        <Col span="20" style="height:40px;">
        <Row>
          <Col span="12">{{item.comment_user}}</Col>
          <Col span="12" style="text-align:right;" @click.native="getCurrentIndex(index)">···</Col>
        </Row>
        <Row>
          <Col style="font-size: 12px;color:#bbb;line-height: 25px;padding-bottom: 0px;height: 20px;">{{format(item.comment_time)}}</Col>
        </Row>
        </Col>
      </Row>
      <Row type="flex" justify="end" style="margin-top:10px">
        <Col span="20">{{item.comment_content}}</Col>
      </Row>
      <Row type="flex" justify="end" style="margin-top:10px" v-if="item.replies.length!=0">
        <Col span="20" style="padding: 5px;background-color: rgba(167, 164, 164, 0.2);">
          <Row v-for="(rItem, replyListIndex) in item.replies" :key="replyListIndex"><span style="color:blue">{{rItem.reply_user}}:</span> {{rItem.reply_content}}</Row>
        </Col>
      </Row>
    </Row>
  </Card>
  <Modal v-model="transmitModal" @on-ok="transmit" :mask-closable="false" :closable="false">
    <textarea placeholder="输入转发理由" v-model="transmitText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
  </Modal>
  <Modal v-model="commentModal" @on-ok="addComment" :mask-closable="false" :closable="false">
    <textarea placeholder="输入评论内容" v-model="commentText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
  </Modal>
  <Modal v-model="replyModal" @on-ok="addReply(currentIndex)" :mask-closable="false" :closable="false">
    <textarea placeholder="输入回复内容" v-model="replyText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
  </Modal>
</div>
</template>
<script>
export default {
  name: 'Detail',
  inject: ["reload"],
  data() {
    return {
      detail: '',
      transmitModal: false,
      commentModal: false,
      replyModal: false,
      isPraised: false,
      transmitText: '',
      commentText: '',
      replyText: '',
      imgNotExist: 'img-not-exist',
      currentIndex: 0,
    }
  },
  mounted() {
    this.axios({
      url: '/api/detail',
      method: 'post',
      params: {
        id: this.$route.query.articleId
      }
    }).then((res) => {
      this.detail = res.data.data;
    })
  },
  computed: {
    format() {
      return this.$store.getters.format
    }
  },
  methods: {
    praise() {
      if (this.detail.praise_state) {
        this.detail.praise_count--;
        this.detail.praise_state = 0;
      } else {
        this.detail.praise_count++;
        this.detail.praise_state = 1;
      }
      this.axios({
        url: '/api/praise',
        method: 'post',
        params: {
          id: this.detail.id,
          praiseCount: this.detail.praise_count,
          praiseState: this.detail.praise_state
        }
      }).then((res) => {}).catch((err) => {})
    },
    transmit() {
      var that = this;
      var currentDate = new Date();
      this.axios.post('/api/transmit', {
        "article_type": "转发",
        "content": that.transmitText,
        "head": that.$store.state.headImgSrc,
        "location": that.$store.getters.pos,
        "nickname": that.$store.state.nickname,
        "publish_time": currentDate,
        "transmit_content": that.detail.content,
        "transmit_id": that.detail.id,
        "transmit_nickname": that.detail.nickname
      }).then((res) => {
        this.axios({
          url: '/api/detail',
          method: 'post',
          params: {
            id: this.$route.query.articleId
          }
        }).then((res) => {
          this.detail = res.data.data;
        })
      })
      this.reload();
      // 每次添加评论后清空内容，用以处理v-model带来的问题
      this.transmitText = "";
    },
    addComment() {
      var currentDate = new Date();
      this.axios.post('/api/addComment', {
        "comment_id": this.$route.query.articleId,
        "comment_user": this.$store.state.nickname,
        "comment_user_head": this.$store.state.headImgSrc,
        "comment_time": currentDate,
        "comment_content": this.commentText
      }).then((res) => {
        this.axios({
          url: '/api/detail',
          method: 'post',
          params: {
            id: this.$route.query.articleId
          }
        }).then((res) => {
          this.detail = res.data.data;
        })
      })
      this.commentText = "";
    },
    addReply(currentIndex) {
      var currentDate = new Date();
      this.axios.post('/api/addReply', {
        "reply_id": this.detail.comments[currentIndex].id,
        "reply_user": this.$store.state.nickname,
        "reply_content": this.replyText
      }).then((res) => {
        this.axios({
          url: '/api/detail',
          method: 'post',
          params: {
            id: this.$route.query.articleId
          }
        }).then((res) => {
          this.detail = res.data.data;
        })
      })
      this.replyText = "";
    },
    getCurrentIndex(index) {
      this.replyModal = true;
      this.currentIndex = index;
    }
  }
}
</script>
<style scoped>
#detailContent {
  border-bottom: 1px solid #eee;
  padding-top: 60px;
  height: fill-available;
  height: -webkit-fill-available;
  height: -moz-fill-available;
  overflow-y: auto;
}

#head {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

#head img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

#desc {
  border: 0;
  width: 100%;
  color: inherit;
  word-break: break-all;
  white-space: pre-wrap;
  text-align: justify;
}

.img-not-exist {
  height: auto !important;
  width: 100% !important;
  text-align: justify;
}

#transmit-content {
  height: 100px;
  /* width: 100%; */
  background-color: rgba(167, 164, 164, 0.2);
  padding: 0 5px;
  word-break: break-all;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: justify;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
