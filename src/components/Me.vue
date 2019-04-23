<template>
<div id="me">
  <div id="wallPaper">
    <div class="head">
      <Upload
        id="upload-head"
        ref="upload"
        :show-upload-list="false"
        :format="['jpg','jpeg','png','webp']"
        :max-size="2048"
        :before-upload="handleBeforeUpload"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :on-success="handleSuccess"
        type="drag"
        :action="uploadAction"
        :headers="uploadHeaders"
        :data="uploadData">
        <img class="head" :src="headImgSrc" />
      </Upload>
    </div>
    <p id="nickName">{{nickname}}</p>
  </div>
  <div class="item" style="border-top:0" @click="$router.push('/Me/ChangeInfo')">修改资料</div>
  <div class="item" @click="$router.push('/Me/ChangePsw')">修改密码</div>
  <div class="item" id="rollOut" @click="rollOut">退出登录</div>
  <Footer></Footer>
</div>
</template>
<script>
export default {
  name: 'Me',
  data() {
    return {
      headImgSrc: '',
      nickname:'',
      uploadHeaders: {
        'token': this.$store.state.token
      },
      uploadData: {
        "id": this.$store.state.user_id
      },
      uploadAction: '/api/changeHead'
    }
  },
  mounted() {
    this.headImgSrc = this.$store.state.headImgSrc;
    this.nickname = this.$store.state.nickname;
    console.log(this.$store.state.user_id)
  },
  methods: {
    handleBeforeUpload(file) {
      // 创建一个 FileReader 对象
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function(e) {
        file.url = reader.result
        if (file.type.slice(0, 5) == "image") {
            _this.headImgSrc = file.url;
            // console.log(file)
        }
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    handleSuccess(res, file) {
      if(res.code === 200) {
        this.headImgSrc = '/api/img/' + res.data;
        this.$store.state.headImgSrc = this.headImgSrc;
      }
    },
    rollOut() {
      this.$store.commit('loginInfo', {
        user_id: "",
        nickname: "管理员",
        token: ""
      })
      this.$store.state.headImgSrc = require("../assets/head-boy.jpg");
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.push("/");
    }
  }
}
</script>
<style scoped>
#wallPaper {
  width: fill-available;
  background-image: url("../assets/wallpaper.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  padding-top: 80px;
  padding-bottom: 50px;
  margin-bottom: 10px;
}

.head {
  margin: 0 auto;
  width: 80px;
  height: 80px;
  /* background-image: url("../assets/head-boy.jpg");
  background-size: cover;
  background-repeat: no-repeat; */
  border-radius: 40px;
}

#nickName {
  margin-top: 5px;
}

.item {
  background-color: #fff;
  border-top: 1px solid #eee;
  padding: 10px 0 10px 20px;
  /* margin-top: 10px; */
}

#rollOut {
  margin: 160px auto 0;
  padding: 10px 0;
  width: 60%;
  text-align: center;
  color: red;
  border-radius: 5px;
  border-top: 0;
}
</style>
<style>
#upload-head .ivu-upload {
  border-radius: 40px;
  height: 80px;
  width: 80px;
}

#upload-head .ivu-upload-drag, #upload-head .ivu-upload-drag:hover {
  border: 0 !important;
}

</style>
