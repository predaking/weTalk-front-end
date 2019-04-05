<template>
<div id="changeInfo">
  <Card id="topSide" :bordered="false">
    <Icon type="ios-arrow-back" id="back" @click="$router.go(-1)"></Icon>修改密码
  </Card>
  <div class="item" style="margin-top:80px;border-top:0"><span class="label">原始密码</span><input class="info" type="password" placeholder="请输入原始密码" maxlength="8"/></div>
  <div class="item"><span class="label">新密码</span><input class="info" type="password" placeholder="请输入新密码"maxlength="8"/></div>
</div>
</template>
<script>
export default {
  name: 'changePsw',
  data() {
    return {}
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
  border: 0;
}
</style>
