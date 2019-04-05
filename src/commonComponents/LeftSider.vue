<template>
<div>
  <h1>Hello 2019!! {{activeName}}</h1>
</div>
</template>
<script>
  export default{
    data(){
      return{
      }
    },
    props:["activeName"],
    // beforeMount(){
    //   return this.activeName;
    // }
}
</script>
