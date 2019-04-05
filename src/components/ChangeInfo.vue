<template>
<div id="changeInfo">
  <Card id="topSide" :bordered="false">
    <Icon type="ios-arrow-back" id="back" @click="$router.go(-1)"></Icon>修改资料
  </Card>
  <div class="item" style="margin-top:80px;border-top:0"><span class="label">昵称</span><input class="info" placeholder="用户昵称八个汉字" maxlength="8"/></div>
  <div class="item"><span class="label">性别</span><Select class="info">
    <Option v-for="(item, index) in sex" :key="index" :value="item.value"></Option>
  </Select></div>
  <div class="item"><span class="label">生日</span><DatePicker type="date" class="info"></DatePicker></div>
  <div class="item"><span class="label">地址</span><input class="info" /></div>
</div>
</template>
<script>
export default {
  name: 'changeInfo',
  data() {
    return {
      sex: [
        {
          value: "男"
        },
        {
          value: "女"
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style scoped>

.item {
  background-color: #fff;
  border-top: 1px solid #eee;
  padding: 10px 0 10px 20px;
  /* margin-top: 10px; */
}

.label {
  display: inline-block;
  width: 90px;
}

.info {
  width: auto;
  border: 0;
}

</style>
<style>
/* 局部修改iview输入框组件样式 */
#changeInfo .ivu-input-icon {
  font-size: 0 !important;
}

#changeInfo .ivu-input {
  height: auto !important;
  border: 0 !important;
  padding: 0 !important;
}

#changeInfo .ivu-input:focus {
  box-shadow: 0 0 0 transparent !important;
}
</style>
