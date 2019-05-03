<template>
<div>
  <!-- <keep-alive>
    <router-view v-if="isRouterAlive && $route.meta.keepAlive"></router-view>
  </keep-alive> -->
  <router-view></router-view>
   <!-- v-if="isRouterAlive" -->
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))));
      // console.log(sessionStorage.getItem("store"));
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
  mounted() {

  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
body {
  position: absolute;
  width: fill-available;
  height: fill-available;
  overflow-y: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #F5F5F5 !important;
  font-size: 15px !important;
}

/* 全局修改顶栏样式 */
#topSide {
  position: fixed;
  z-index: 1;
  top: 0px;
  font-size: 18px;
  width: fill-available;
  border-radius: 0px !important;
  background-color: mediumslateblue;
  color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  border-color: #eee;
  text-align: center;
}

/* 登录注册 */
#login,
#register {
  height: fill-available;
  background-color: rgba(144, 158, 255, 0.4);
  padding-top: 100px;
}

/* 返回箭头 */
#back {
  position: absolute;
  left: 15px;
  font-size: 25px;
}

/* 在全局位置对iview原始组件样式进行修改 */
/* 日期选择器修改 */

.ivu-date-picker-focused input {
  box-shadow: 0 0 0 transparent !important;
}

/* 默认输入框样式修改 */
input:focus {
  outline: 0 !important;
  /* outline-offset: 0 !important; */
}

/* 文本框聚焦边框样式修改 */
textarea {
  word-break: break-all;
  white-space: pre-wrap;
  text-align: justify;
}

textarea:focus {
  outline: 0;
}

.ivu-select {
  height: auto !important;
  width: 120px !important;
  line-height: inherit !important;
}

.ivu-select-selection {
  height: auto !important;
  border: 0 !important;
}

.ivu-select-arrow {
  font-size: 0 !important;
}

.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: inherit !important;
  line-height: inherit !important;
  font-size: inherit !important;
  padding: 0 !important;
}

.ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  height: auto !important;
  line-height: inherit !important;
}

.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  height: auto !important;
  line-height: inherit !important;
  padding: 0 !important;
}

.ivu-select-visible .ivu-select-selection {
  box-shadow: 0 0 0 transparent !important;
}

.ivu-select-item {
  text-align: center;
  font-size: inherit !important;
}

/* 修改iview默认无限滚动组件样式 */
.ivu-scroll-container {
  /* margin-bottom: 30px !important; */
  height: fill-available !important;
}

.ivu-scroll-content {
  /* padding-bottom: 40px !important;
  padding-top: 10px !important; */
}

.ivu-scroll-loader-wrapper-active {
  /* display: none !important; */
  height: 20px !important;
}

/* iview确认框样式修改 */
.ivu-modal-body {
  font-size: inherit;
}

.ivu-modal-footer {
  border-top: 0 !important;
}

.ivu-modal-confirm-body {
  padding-left: 0 !important
}

.imgModal .ivu-modal-footer {
  display: none;
}

/* iview下拉菜单样式更改 */
.ivu-dropdown-item {
  text-align: center;
}

.ivu-select-dropdown {
  z-index: 0 !important;
}

/* 加载图标动画 */
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.demo-spin-col {
  height: 10px;
  margin-top: 10px;
  position: relative;
  /* border: 1px solid #eee; */
}

/* 加载图标样式 */
.loading {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto auto;
  width: 32px;
}


</style>
