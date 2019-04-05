<template>
<div>
  {{msg}}
</div>
</template>

<script>
export default {
  name: 'Biography',
  data() {
    return {
      msg: "当前时间：" + new Date().toLocaleString()
    }
  },
  methods: {
    jump(e) {
      this.$router.push(e);
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
