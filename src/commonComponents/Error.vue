<template>
    <div id="error">
      <img src="../assets/error.gif"/>
      <p id="error-info">{{errorContent}}</p>
      <Button type="success" v-on:click="$emit('reload')">重新加载</Button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ["errorContent"],
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped>
#error {
  position: absolute;
  top: 35%;
  z-index: 1;
  left: 0;
  right: 0;
  margin: auto auto;
  /* width: 100px; */
  height: 100px;
  text-align: center;
  /* background-color: #fff; */
  /* font-size: 15px; */
  /* text-align: center; */
}

img {
  height: 100px;
  width: 100px;
}

#error-info {
  margin-bottom: 5px;
}
</style>
