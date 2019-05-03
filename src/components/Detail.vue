<template>
<div>
  <Card id="topSide" :bordered="false">
    <Icon type="ios-arrow-back" id="back" @click="goBack()"></Icon>动态详情
  </Card>
  <Spin v-if="!loaded" size="large" class="loading" style="z-index: 1"></Spin>
  <Error v-if="error" :errorContent="$store.state.errorContent" v-on:reload="loading()"></Error>
  <Scroll id="scroll" :on-reach-bottom="handleReachBottom" loading-text="" :distance-to-edge=[0,0]>
    <Card v-if="loaded && !error" id="detailContent" dis-hover :bordered="false">
      <Row>
        <Col span="4">
        <div id="head"><img :src="detail.head" /></div>
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
          <Col span="8" style="height:100px;width:33.3333%" v-if="detail.transmitPicture.length!=0"><img v-if="detail.transmitPicture.length!=0" :src="'http://24x410t862.qicp.vip:46650/img/' + detail.transmitPicture[0].picture_url" style="height:inherit;width:100%" @click="viewImg(detail.transmitPicture[0].picture_url)" /></Col>
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
          <Col v-for="(item, imgIndex) in detail.articlePicture" :key="imgIndex" span="8" style="height:100px;width:33.3333%"><img :src="'http://24x410t862.qicp.vip:46650/img/' + item.picture_url" style="height:inherit;width:100%" @click="viewImg(item.picture_url)" /></Col>
        </Row>
      </div>
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
      <Row v-for="(item, index) in detail.comments.content" :key="index" style="padding:5px 0 10px;border-top:1px solid #eee;">
        <Row>
          <Col span="4">
          <div id="head"><img :src="item.comment_user_head" /></div>
          </Col>
          <Col span="20" style="height:40px;">
          <Row>
            <Col span="12">{{item.comment_user}}</Col>
            <Col span="12" style="text-align:right;"><span @click="getCurrentIndex(index)">···</span></Col>
          </Row>
          <Row>
            <Col span="12" style="font-size: 12px;color:#bbb;line-height: 25px;padding-bottom: 0px;height: 20px;">{{format(item.comment_time)}}</Col>
            <Col v-if="item.comment_user_id === $store.state.user_id" span="12" style="text-align:right">
            <Dropdown>
              <Icon type="ios-arrow-down"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="deleteComment(item.id, index)">删除</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </Col>
          </Row>
          </Col>
        </Row>
        <Row type="flex" justify="end" style="margin-top:10px">
          <Col span="20" style="word-break:break-all">{{item.comment_content}}</Col>
        </Row>
        <Row type="flex" justify="end" style="margin-top:10px" v-if="item.replies.length!=0">
          <Col span="20" style="padding: 5px;background-color: rgba(167, 164, 164, 0.2);">
          <Row v-for="(rItem, replyListIndex) in item.replies" :key="replyListIndex">
            <Col span="20" style="word-break:break-all"><span style="color:blue">{{rItem.reply_user}}:</span> {{rItem.reply_content}}</Col>
            <Col v-if="rItem.reply_user_id === $store.state.user_id" span="4" style="text-align:right">
            <Dropdown>
              <Icon type="ios-arrow-down"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="deleteReply(rItem.id, index, replyListIndex)">删除</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </Col>
          </Row>
          </Col>
        </Row>
      </Row>
    </Card>
  </Scroll>
  <Modal v-model="transmitModal" @on-ok="transmit" :mask-closable="false" :closable="false">
    <textarea placeholder="输入转发理由" v-model="transmitText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
  </Modal>
  <Modal v-model="commentModal" @on-ok="addComment" :mask-closable="false" :closable="false">
    <textarea placeholder="输入评论内容" v-model="commentText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
  </Modal>
  <Modal v-model="replyModal" @on-ok="addReply(currentIndex)" :mask-closable="false" :closable="false">
    <textarea placeholder="输入回复内容" v-model="replyText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
  </Modal>
  <Modal class="imgModal" v-model="visible" :closable="false">
    <img :src="'http://24x410t862.qicp.vip:46650/img/' + imgName" v-if="visible" style="width:100%" />
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
      loaded: false,
      error: false,
      isAll: false,
      imgName: '',
      visible: false,
      page: 0,
    }
  },
  mounted() {
    this.loading();
  },
  computed: {
    format() {
      return this.$store.getters.format
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    loading() {
      this.axios({
        url: 'http://24x410t862.qicp.vip:46650/detail',
        method: 'post',
        params: {
          page: 0,
          size: 10,
          id: this.$route.query.articleId,
        }
      }).then((res) => {
        this.detail = res.data.data;
        this.loaded = true;
      }).catch((err) => {
        console.log(err.response)
        this.$store.commit('errorInfo', {
          status: err.response.status
        });
        this.loaded = true;
        this.error = true;
      })
    },
    praise() {
      if (this.detail.praise_state) {
        this.detail.praise_count--;
        this.detail.praise_state = 0;
      } else {
        this.detail.praise_count++;
        this.detail.praise_state = 1;
      }
      this.axios({
        url: 'http://24x410t862.qicp.vip:46650/praise',
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
      this.axios.post('http://24x410t862.qicp.vip:46650/transmit', {
        "article_type": "转发",
        "content": that.transmitText,
        "user_id": that.$store.state.user_id,
        "head": that.$store.state.headImgSrc,
        "location": that.$store.getters.pos,
        "nickname": that.$store.state.nickname,
        "publish_time": currentDate,
        "transmit_content": that.detail.content,
        "transmit_id": that.detail.id,
        "transmit_nickname": that.detail.nickname
      }).then((res) => {
        // this.loading();
      })
      this.detail.transmit_count++;
      // this.reload();
      // 每次添加评论后清空内容，用以处理v-model带来的问题
      this.transmitText = "";
    },
    addComment() {
      var currentDate = new Date();
      this.axios.post('http://24x410t862.qicp.vip:46650/addComment', {
        "comment_id": this.$route.query.articleId,
        "comment_user_id": this.$store.state.user_id,
        "comment_user": this.$store.state.nickname,
        "comment_user_head": this.$store.state.headImgSrc,
        "comment_time": currentDate,
        "comment_content": this.commentText
      }).then((res) => {
        this.loading();
      })
      // this.detail.comment_count++;
      this.commentText = "";
    },
    addReply(currentIndex) {
      var currentDate = new Date();
      this.axios.post('http://24x410t862.qicp.vip:46650/addReply', {
        "reply_id": this.detail.comments.content[currentIndex].id,
        "reply_user_id": this.$store.state.user_id,
        "reply_user": this.$store.state.nickname,
        "reply_content": this.replyText
      }).then((res) => {
        this.loading();
      })
      this.replyText = "";
    },
    getCurrentIndex(index) {
      this.replyModal = true;
      this.currentIndex = index;
    },
    handleReachBottom() {
      if (!this.isAll) {
        return new Promise(resolve => {
          this.axios({
            method: "get",
            url: "http://24x410t862.qicp.vip:46650/commentList",
            headers: {
              token: this.$store.state.token
            },
            params: {
              comment_id: this.$route.query.articleId,
              page: ++this.page,
              size: 10
            }
          }).then((res) => {
            if (res.data.data.empty) {
              this.isAll = true;
              this.$Message.info({
                content: "已加载全部评论"
              })
            } else {

              this.detail.comments.content = this.detail.comments.content.concat(res.data.data.content);
              console.log(this.detail.comments.content)
            }
            resolve();
          }).catch((err) => {})
        });
      } else {
        this.$Message.info({
          content: "已加载全部评论"
        });
      }
    },
    viewImg(imgName) {
      this.imgName = imgName;
      this.visible = true;
    },
    deleteComment(id, index) {
      this.axios({
        url: 'http://24x410t862.qicp.vip:46650/deleteComment',
        method: 'post',
        params: {
          "id": id,
          "comment_id": this.detail.id
        }
      }).then((res) => {
        // this.loading();
      }).catch((err) => {})
      this.detail.comments.content.splice(index, 1);
      this.detail.comment_count--;
    },
    deleteReply(id, commentIndex, replyIndex) {
      this.axios({
        url: 'http://24x410t862.qicp.vip:46650/deleteReply',
        method: 'post',
        params: {
          "id": id,
        }
      }).then((res) => {
        // this.loading();
      }).catch((err) => {})
      this.detail.comments.content[commentIndex].replies.splice(replyIndex, 1);
    }
  },
  watch: {
    $route() {
      this.loading();
    }
  }
}
</script>
<style scoped>
#scroll {
  background-color: #fff;
  padding-top: 45px;
  /* padding-bottom: 50px; */
}

#detailContent {
  border-bottom: 1px solid #eee;
  height: fill-available;
  height: -webkit-fill-available;
  height: -moz-fill-available;
  /* overflow-y: auto; */
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
