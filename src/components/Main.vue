<template>
<div>
  <Card id="topSide" :bordered="false"><a href="#content" style="color:#fff">动态</a></Card>
  <Spin size="large" v-if="!loaded" class="loading"></Spin>
  <Error v-if="error" errorContent="网络错误" v-on:reload="loading()"></Error>
  <Scroll v-if="loaded && !error" id="scroll" :on-reach-bottom="handleReachBottom" :on-reach-top="handleReachTop" loading-text="" :distance-to-edge=[0,0]>
    <!-- <Col class="demo-spin-col" v-if="isTopFreahing">
    <Spin fix>
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
    </Spin>
    </Col> -->
    <Card id="content" dis-hover v-for="(item, index) in articleData" :key="index" :bordered="false">
      <Row>
        <Col span="4">
        <div id="head"><img :src="item.head" /></div>
        </Col>
        <Col span="20" style="height:40px;">
        <Row>
          <Col span="12">{{item.nickname}}</Col>
          <Col span="12" style="text-align:right;">{{item.location}}</Col>
        </Row>
        <Row>
          <Col id="time-col">{{format(item.publish_time)}}</Col>
        </Row>
        </Col>
      </Row>
      <div v-if="item.article_type==='原创'" @click="$router.push({path:'/Detail', query: {articleId: item.id}})">
        <Row style="margin-top:10px">
          <Col>
          <div id="desc" ref="desc">{{content(index)}}<span v-if="isAllArticle(index)" style="color:blue">全文</span></div>
          </Col>
        </Row>
        <Row style="margin-top:10px">
          <Col v-for="(img, imgIndex) in item.articlePicture" :key="imgIndex" span="8" style="height:100px;width:33.3333%"><img :src="'/api/img/' + img.picture_url" style="height:inherit;width:100%" /></Col>
        </Row>
      </div>
      <div v-if="item.article_type==='转发'">
        <Row style="margin-top:10px" @click.native="$router.push({path:'/Detail', query: {articleId: item.id}})">
          <Col>
          <div id="desc" ref="desc">{{content(index)}}<span v-if="isAllArticle(index)" style="color:blue">全文</span></div>
          </Col>
        </Row>
        <Row style="margin-top:10px" @click.native="$router.push({path:'/Detail', query: {articleId: item.transmit_id}})">
          <Col span="8" style="height:100px;width:33.3333%" v-if="item.transmitPicture.length!=0"><img v-if="item.transmitPicture.length!=0" :src="'/api/img/' + item.transmitPicture[0].picture_url" style="height:inherit;width:100%" /></Col>
          <Col span="16" id="transmit-content" :class="[item.transmitPicture.length ? '' : imgNotExist]"><span style="color:blue">{{item.transmit_nickname}}:</span>{{item.transmit_content}}</Col>
        </Row>
      </div>
      <Row style="margin-top:10px">
        <Col span="8" style="text-align:center">
        <i class="fa fa-thumbs-o-up" v-if="!item.praise_state" @click="praised(index)"></i>
        <i class="fa fa-thumbs-up" v-if="item.praise_state" @click="praised(index)"></i>
        {{" " + item.praise_count}}
        </Col>
        <Col span="8" style="text-align:center">
        <i class="fa fa-commenting-o" @click="$router.push({path:'/Detail', query: {articleId: item.id}})"></i>
        {{" " + item.comment_count}}
        </Col>
        <Col span="8" style="text-align:center">
        <i class="fa fa-external-link" @click="getCurrentIndex(index)"></i>
        {{" " + item.transmit_count}}
        </Col>
      </Row>
    </Card>
    <!-- <Col class="demo-spin-col" v-if="isBottomFreahing">
    <Spin fix>
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
    </Spin>
    </Col> -->
  </Scroll>
  <Modal v-model="transmitModal" @on-ok="transmit(currentIndex)" :mask-closable="false" :closable="false" :transfer="false">
    <textarea id="transmit-area" placeholder="输入转发理由" v-model="transmitText" autofocus="true"></textarea>
  </Modal>
  <Footer style=""></Footer>
</div>
</template>
<script>
export default {
  data() {
    return {
      transmitModal: false,
      transmitText: '',
      articleData: [],
      // articleLength: 0,
      currentIndex: 0,
      imgNotExist: 'img-not-exist',
      page: 0,
      loaded: false,
      error: false,
      isAll: false,
      // 记录是否有新内容
      hasNew: true,
      // 记录总数，用以检测每次请求后的新总数是否一致，是则表示有新的内容
      totalElements: 0,
    }
  },
  mounted() {
    this.loading();
  },
  computed: {
    content() {
      return function(index) {
        if (this.articleData[index].content.length > 80) {
          return this.articleData[index].content.slice(0, 80) + "..."
        } else {
          return this.articleData[index].content
        }
      }
    },
    isAllArticle() {
      return function(index) {
        if (this.articleData[index].content.length > 80)
          return true;
        else
          return false;
      }
    },
    format() {
      return this.$store.getters.format
    },
  },
  methods: {
    loading() {
      this.axios({
        method: "get",
        url: "/api/articleList",
        headers: {
          token: this.$store.state.token
        },
        params: {
          page: 0,
          size: 10
        }
      }).then((res) => {
        console.log(res)
        this.articleData = res.data.data.content;
        this.totalElements = res.data.data.totalElements;
        this.loaded = true;
      }).catch((err) => {
        console.log(err.response)
      })
    },
    getCurrentIndex(index) {
      this.transmitModal = true;
      this.currentIndex = index;
    },
    praised(index) {
      if (this.articleData[index].praise_state) {
        this.articleData[index].praise_count--;
        this.articleData[index].praise_state = 0;
      } else {
        this.articleData[index].praise_count++;
        this.articleData[index].praise_state = 1;
      }
      this.axios({
        url: '/api/praise',
        method: 'post',
        params: {
          id: this.articleData[index].id,
          praiseCount: this.articleData[index].praise_count,
          praiseState: this.articleData[index].praise_state
        }
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    },
    handleReachBottom(dir) {
      this.isBottomFreahing = true
      if (!this.isAll) {
        return new Promise(resolve => {
          this.axios({
            method: "get",
            url: "/api/articleList",
            headers: {
              token: this.$store.state.token
            },
            params: {
              page: ++this.page,
              size: 10
            }
          }).then((res) => {
            if (res.data.data.empty) {
              this.isAll = true;
              this.$Message.info({
                content: "已经到底啦！！！"
              })
            } else {
              this.articleData = this.articleData.concat(res.data.data.content);
            }
            resolve();
          }).catch((err) => {})
        });
      } else {
        this.$Message.info({
          content: "已经到底啦！！！"
        });
      }
    },
    handleReachTop() {
      // 相当于重新请求列表
      this.page = 0;
      this.isAll = false;
      return new Promise(resolve => {
        this.axios({
          method: "get",
          url: "/api/articleList",
          headers: {
            token: this.$store.state.token
          },
          params: {
            page: 0,
            size: 10
          }
        }).then((res) => {
          this.articleData = res.data.data.content;
          if (res.data.data.totalElements === this.totalElements) {
            this.$Message.info("暂无更多新内容！！");
            this.hasNew = false;
          } else {
            this.totalElements = res.data.data.totalElements;
            this.hasNew = true;
          }
          resolve();
        }).catch((err) => {})
      });
    },
    transmit(index) {
      var that = this;
      var currentDate = new Date();
      this.axios.post('/api/transmit', {
        "article_type": "转发",
        "content": that.transmitText,
        "user_id": that.$store.state.user_id,
        "head": that.$store.state.headImgSrc,
        "location": that.$store.getters.pos,
        "nickname": that.$store.state.nickname,
        "publish_time": currentDate,
        "transmit_content": that.articleData[index].content,
        "transmit_id": that.articleData[index].id,
        "transmit_nickname": that.articleData[index].nickname
      }).then((res) => {
        this.loading();
      }).catch((err) => {

      })
      // 每次添加评论后清空内容，用以处理v-model带来的问题
      this.transmitText = "";
    }
  }
}
</script>
<style scoped>
#scroll {
  background-color: #fff;
  padding-top: 45px;
  padding-bottom: 50px;
}

#content {
  margin: 2px 0;
  border-bottom: 1px solid #eee;
}

#time-col {
  font-size: 12px;
  color: #bbb;
  line-height: 25px;
  padding-bottom: 0px;
  height: 20px;
}

#desc {
  border: 0;
  width: 100%;
  color: inherit;
  word-break: break-all;
  white-space: pre-wrap;
  text-align: justify;
}

#transmit-area {
  width: 100%;
  resize: none;
  border: 0;
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

.img-not-exist {
  height: auto !important;
  width: 100% !important;
  text-align: justify;
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
<style>
#content .ivu-card-body {
  padding: 16px 16px 10px !important;
}
</style>
