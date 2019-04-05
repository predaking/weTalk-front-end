<template>
<div>
  <Card id="topSide" :bordered="false">动态</Card>
  <Scroll :on-reach-bottom="handleReachBottom" style="background-color:#fff;padding-top:32px" :distance-to-edge=[0,0]>
    <Card id="content" dis-hover v-for="(item, index) in list3" :key="index" :bordered="false" style="margin: 2px 0;border-bottom:1px solid #eee">
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
        <div ref="desc" style="border: 0;width: 100%;color:inherit;word-break:break-all;white-space:pre-wrap;text-align:justify" @click="$router.push('/Detail')">{{newDesc}}<span v-if="isAllArticle" style="color:blue">全文</span></div>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col v-for="(item, imgIndex) in imgList" :key="imgIndex" span="8" style="height:100px;width:33.3333%"><img :src="item.imgsrc" style="height:inherit;width:100%" /></Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="8" style="text-align:center">
        <i class="fa fa-thumbs-o-up" v-if="isPraised==false" @click="praise()"></i>
        <i class="fa fa-thumbs-up" v-if="isPraised==true" @click="praise()"></i>
        {{" " + countList[0]}}
        </Col>
        <Col span="8" style="text-align:center">
        <i class="fa fa-commenting-o" @click="$router.push('/Detail')"></i>
        {{" " + countList[1]}}
        </Col>
        <Col span="8" style="text-align:center">
        <i class="fa fa-external-link" @click="transmitModal=true"></i>
        {{" " + countList[2]}}
        </Col>
      </Row>
    </Card>
  </Scroll>
  <Modal v-model="transmitModal" @on-ok="ok" :mask-closable="false" :closable="false" :transfer="false">
    <textarea placeholder="输入转发理由" v-model="transmitText" autofocus="true" style="width:100%;resize:none;border:0;"></textarea>
  </Modal>
  <Footer style=""></Footer>
</div>
</template>
<script>
export default {
  data() {
    return {
      transmitModal: false,
      isAllArticle: false,
      isPraised: false,
      desc: "看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！看尔乃插标卖首！",
      list3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      imgList: [{
        imgsrc: require('../assets/huaxiong.png')
      }, {
        imgsrc: require('../assets/yanliangwenchou.png')
      }, {
        imgsrc: require('../assets/pangde.png')
      }],
      countList: [400, 39, 7],
      transmitText: ''
    }
  },
  mounted() {
    this.axios({
      method:"get",
      url: "/api/ttt",
      headers: {
        token: this.$store.state.token
      },
    }).then((res)=>{
    }).catch((err)=>{
    })
    // this.$router.push("/Me/Login");
  },
  computed: {
    newDesc: function() {
      if (this.desc.length > 80) {
        this.isAllArticle = true
        return this.desc.slice(0, 80) + "..."
      } else
        return this.desc.slice(0, 80)
    }
  },
  methods: {
    handleReachBottom(dir) {
      return new Promise(resolve => {
        setTimeout(() => {
          if (dir > 0) {
            const first = this.list3[0];
            for (let i = 1; i < 11; i++) {
              this.list3.unshift(first - i);
            }
          } else {
            const last = this.list3[this.list3.length - 1];
            for (let i = 1; i < 11; i++) {
              this.list3.push(last + i);
            }
          }
          resolve();
        }, 2000);
      });
    },
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
      console.log(this.transmitText)
    }
  }
}
</script>
<style scoped>
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
<style>
#content .ivu-card-body {
  padding: 16px 16px 10px !important;
}
</style>
