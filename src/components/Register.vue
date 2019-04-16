<template>
<div id="register">
  <div id="logo"></div>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user" class="loginItem" style="margin-top:50px">
      <Input type="text" v-model="formInline.user" placeholder="昵称" :maxlength="8">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="phone" class="loginItem">
      <Input type="text" v-model="formInline.phone" placeholder="手机号码">
      <Icon type="ios-phone-portrait" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password" class="loginItem">
      <Input type="password" v-model="formInline.password" placeholder="密码">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="passwordRepeat" class="loginItem">
      <Input type="password" v-model="formInline.passwordRepeat" placeholder="确认密码">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button id="login-button" type="primary" @click="handleSubmit('formInline')">注册</Button>
    </FormItem>
    <FormItem class="loginItem" style="text-align:center;margin:40px 40px 0px">
      <p class="operspan" @click="$router.push('/')">已有账号，立即登录</p>
    </FormItem>
  </Form>
</div>
</template>
<script>
export default {
  name: 'register',
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formInline.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    return {
      formInline: {
        user: '',
        password: '',
        phone:'',
        passwordRepeat: ''
      },
      ruleInline: {
        user: [{
          required: true,
          message: '昵称不能为空',
          trigger: 'blur'
        },{
          max: 8,
          message: '昵称最长8位',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '手机号码不能为空',
          trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '密码必须6~18位',
            trigger: 'blur'
          },
          {
            required: true,
            pattern: /^[a-zA-Z](?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/,
            message: '必须至少包含数字与大小写字母且以字母开头',
            trigger: 'blur'
          }
        ],
        passwordRepeat: [{
          validator: validatePassCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios({
            method:"post",
            url: "/api/register",
            data: {
              nickname: this.formInline.user,
              password: this.formInline.password,
              tel:this.formInline.phone
            }
          }).then((res)=>{
            console.log(res.data);
            if(res.data.code === -1)
              this.$Message.error(res.data.msg);
            else {
              this.$store.commit('loginInfo', {
                token: res.data.token,
                nickname: this.formInline.user,
                user_id: res.data.user_id
              })
              sessionStorage.setItem("store",JSON.stringify(this.$store.state))
              this.$router.push('/Main');
            }
          })
        } else {
          this.$Message.error('请正确填写注册信息！');
        }
      })
    },
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
