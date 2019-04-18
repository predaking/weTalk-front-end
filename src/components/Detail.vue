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
    <Row v-for="(item, commentListIndex) in commentList" :key="commentListIndex" style="padding:5px 0 10px;border-top:1px solid #eee;">
      <Row>
        <Col span="4">
          <div id="head"><img :src="item.head" /></div>
        </Col>
        <Col span="20" style="height:40px;">
          <Row>
            <Col span="12">{{item.nickName}}</Col>
            <Col span="12" style="text-align:right;" @click.native="addReply">···</Col>
          </Row>
          <Row>
            <Col style="font-size: 12px;color:#bbb;line-height: 25px;padding-bottom: 0px;height: 20px;">{{item.replyTime}}</Col>
          </Row>
        </Col>
      </Row>
      <Row type="flex" justify="end" style="margin-top:10px">
        <Col span="20">{{item.content}}</Col>
      </Row>
      <Row type="flex" justify="end" style="margin-top:10px">
        <Col span="20" style="padding: 5px;background-color: lightgray;">
          <Row v-for="(rItem, replyListIndex) in item.replyList" :key="replyListIndex"><span style="color:blue">{{rItem.nickName}}:</span> {{rItem.content}}</Row>
        </Col>
      </Row>
    </Row>
    <Modal v-model="transmitModal" @on-ok="transmit()" :mask-closable="false" :closable="false">
      <textarea placeholder="输入转发理由" v-model="transmitText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
    </Modal>
    <Modal v-model="commentModal" @on-ok="ok" :mask-closable="false" :closable="false">
      <textarea placeholder="输入评论内容" v-model="commentText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
    </Modal>
  </Card>
</div>
</template>
<script>
export default {
  name: 'Detail',
  data() {
    return {
      detail: '',
      transmitModal: false,
      commentModal: false,
      isPraised: false,
      transmitText: '',
      commentText: '',
      commentList: [{
        head: require('../assets/zhouyu.png'),
        nickName: '周公瑾',
        content: '你就是个弟弟',
        replyTime: '1小时前',
        replyList: [{
          nickName: '曹仁',
          content: '+1'
        },{
          nickName: '吕蒙',
          content: '搞死他'
        }]
      },{
        head: require('../assets/caoren.png'),
        nickName: '曹仁',
        content: '搞死你',
        replyTime: '2小时前',
        replyList: []
      }]
    }
  },
  mounted() {
    this.axios({
      url: '/api/detail',
      method: 'post',
      params: {
        id: this.$route.query.articleId
      }}).then((res) => {
        this.detail = res.data.data
        console.log(res);
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
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
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
        // console.log(res)
      })
      this.$router.push('/Main');
      // 每次添加评论后清空内容，用以处理v-model带来的问题
      this.transmitText = "";
    },
    addReply() {
      console.log(111)
      this.commentList.push({
        head: require('../assets/zhouyu.png'),
        nickName: '周公瑾',
        content: '你就是个弟弟',
        replyTime: '1小时前',
        replyList: [{
          nickName: '曹仁',
          content: '+1'
        },{
          nickName: '吕蒙',
          content: '搞死他'
        }]
      })
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
</style>
