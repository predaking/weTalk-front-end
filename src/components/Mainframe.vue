<template>
<div>
  <div v-html="msg"></div>
  <Input v-model.lazy="msg"/>
  <h1 v-for="(item ,index) in testList" :key="item.id" style="color:green">{{item.content}}</h1>
  <Button type = "success" @click = "addList">添加</Button>
  <Button type = "error" @click = "deleteList">删除</Button>
  <Button type = "warning" @click = "dListFromHead">移除</Button>
  <Button type = "info" @click = "addListFromHead">增加</Button>
  <Button type = "dashed" @click.ctrl.exact = "changeList">改变</Button>
  <Button type = "primary" @click.left = "sortList">排序</Button>
  <Input  @keyup.space = "keyEvent">键盘</Input>
  <h1>{{currentTime}}</h1>
  <LeftSider active-name="Fighting!!!"></LeftSider>
  <left-sider style="color:red"></left-sider>
  <!-- <img src="../assets/main.jpg" title="this is a picture"/>
  <h1 @click="jump('/Basicinfo')">欢迎来到阴阳师攻略主页</h1> -->
</div>
</template>

<script>
import LeftSider from '@/commoncomponents/LeftSider'
export default {
  name: 'Mainframe',
  components: {
    LeftSider
  },
  data() {
    return {
      currentTime: "",
      msg:'<h2 style="color:red">Today is Thursday</h2>',
      testList:[{
        content: "一列表"
      },
      {
        content: "七列表"
      },
      {
        content: "三列表"
      },
      {
        content: "九列表"
      }]
    }
  },
  methods: {
    reverseString: function() {
      this.msg = this.msg.split('T')
    },
    getCurrentTime: function() {
      this.currentTime = Date.now()
    },
    addList: function() {
      this.testList.push({
        content: "四列表"
      })
    },
    deleteList: function() {
      this.testList.pop()
    },
    dListFromHead: function() {
      this.testList.shift()
    },
    addListFromHead: function() {
      this.testList.unshift({
        content: "零列表"
      })
    },
    changeList: function() {
      // this.testList[1] = "改变了！！！"
      this.$set(this.testList, 1, {
        content: "改变了！！！"
      })
    },
    sortList: function() {
      this.testList.reverse()
    },
  },
  computed: {
    time: function() {
      return Date.now()
    }
  },
  watch: {
    keyEvent: function() {
      console.log("11111111111")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  text-align: center;
  padding-top: 100px !important;
}
</style>
