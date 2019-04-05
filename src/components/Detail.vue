<template>
<div>
  <Card id="topSide" :bordered="false">
    <Icon type="ios-arrow-back" id="back" @click="$router.go(-1)"></Icon>动态详情
  </Card>
  <Card id="detailContent" dis-hover :bordered="false">
    <Row>
      <Col span="4">
        <div id="head"><img src="../assets/guanyu.png" /></div>
      </Col>
      <Col span="20" style="height:40px;">
        <Row>
          <Col span="12">关羽</Col>
          <Col span="12" style="text-align:right;">荆州南郡</Col>
        </Row>
        <Row>
          <Col style="font-size: 12px;color:#bbb;line-height: 25px;padding-bottom: 0px;height: 20px;">1小时前</Col>
        </Row>
      </Col>
    </Row>
    <Row style="margin-top:10px">
      <Col>
      <div ref="desc" style="border: 0;width: 100%;color:inherit;word-break:break-all;white-space:pre-wrap;text-align:justify">{{desc}}</div>
      </Col>
    </Row>
    <Row style="margin-top:10px">
      <Col v-for="(item, imgIndex) in imgList" :key="imgIndex" span="8" style="height:100px;width:33.3333%"><img :src="item.imgsrc" style="height:inherit;width:100%" /></Col>
    </Row>
    <Row style="margin:10px auto;">
      <Col span="8" style="text-align:center">
      <i class="fa fa-thumbs-o-up" v-if="isPraised==false" @click="praise()"></i>
      <i class="fa fa-thumbs-up" v-if="isPraised==true" @click="praise()"></i>
      {{" " + countList[0]}}
      </Col>
      <Col span="8" style="text-align:center">
      <i class="fa fa-commenting-o" @click="commentModal=true"></i>
      {{" " + countList[1]}}
      </Col>
      <Col span="8" style="text-align:center">
      <i class="fa fa-external-link" @click="transmitModal=true"></i>
      {{" " + countList[2]}}
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
    <Modal v-model="transmitModal" @on-ok="ok" :mask-closable="false" :closable="false">
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
      transmitModal: false,
      commentModal: false,
      isPraised: false,
      desc: "看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！",
      imgList: [{
        imgsrc: require('../assets/huaxiong.png')
      }, {
        imgsrc: require('../assets/yanliangwenchou.png')
      }, {
        imgsrc: require('../assets/pangde.png')
      }, {
        imgsrc: require('../assets/huaxiong.png')
      }, {
        imgsrc: require('../assets/yanliangwenchou.png')
      }, {
        imgsrc: require('../assets/pangde.png')
      }, {
        imgsrc: require('../assets/huaxiong.png')
      }, {
        imgsrc: require('../assets/yanliangwenchou.png')
      }, {
        imgsrc: require('../assets/pangde.png')
      }],
      countList: [400, 39, 7],
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
  methods: {
    praise() {
      if (this.isPraised) {
        this.countList[0]--;
        this.isPraised = false;
      } else {
        this.countList[0]++;
        this.isPraised = true;
      }
    },
    ok() {
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
