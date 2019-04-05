<template>
<div id="login">
  <div id="logo"></div>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user" class="loginItem" style="margin-top:50px">
      <Input type="text" v-model="formInline.user" placeholder="昵称">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password" class="loginItem">
      <Input type="password" v-model="formInline.password" placeholder="密码" :maxlength="18">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem class="loginItem oper">
      <p class="operspan">记住密码</p><Checkbox style="margin-left:-140px;font-size:16px"></Checkbox>
      <p class="operspan" @click="$router.push('/Me/Register')">立即注册</p>
    </FormItem>
    <FormItem>
      <Button id="login-button" type="primary" @click="handleSubmit('formInline')">登录</Button>
    </FormItem>
    <FormItem class="loginItem" style="text-align:center;margin-top:120px">
      <p class="operspan">忘记密码？</p>
    </FormItem>
  </Form>
</div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [{
          required: true,
          message: '昵称不能为空',
          trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios({
            method:"post",
            url: "/api/api/authentication",
            data: {
              nickname: this.formInline.user,
              password: this.formInline.password,
            }
          }).then((res)=>{
            if(res.data.code === -1)
              this.$Message.error(res.data.message);
            else {
              this.$store.commit('loginInfo', {
                token: res.data.token,
                nickname: res.data.nickname
              })
              console.log("成功了")
              sessionStorage.setItem("store",JSON.stringify(this.$store.state))
              
              if(res.data.head)
              this.$store.state.headImgSrc = '/api/img/' + res.data.head;
              this.$router.push('/');
            }
          })
        } else {
          this.$Message.error('请输入昵称与密码!');
        }
      })
    }
  }
}
</script>
<style scoped>

#logo {
  margin: 0 auto;
  width: 80px;
  height: 80px;
  background-image: url("../assets/head-girl.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 40px;
}

.loginItem {
  margin: 25px 40px;
}

.oper {
  margin: -10px 40px 15px !important;
  color: #fff;
  font-size: 14px;
}

.operspan {
  color: #fff;
  font-size: 14px;
}
#login-button {
  margin: auto 40px;
  width: fill-available;
  background-color: mediumslateblue;
  border: 0 !important;
}
</style>
<style>
.oper .ivu-form-item-content {
  width: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
}
</style>
