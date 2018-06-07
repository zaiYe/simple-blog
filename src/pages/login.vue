<template>
  <mu-container class="tc login">
    <mu-form ref="form" :model="loginFormInfo">
      <mu-form-item prop="userName" :rules="requiredRule">
        <mu-text-field v-model="loginFormInfo.userName" prop="userName" icon="account_circle" label="用户名"
                       label-float></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="password" :rules="requiredRule2">
        <mu-text-field v-model="loginFormInfo.password" icon="locked" prop="password" label="密码"
                       label-float></mu-text-field>
      </mu-form-item>
      <mu-button color="primary" @click="login">登录</mu-button>
    </mu-form>
  </mu-container>
</template>
<script>
  import UserApi from '../services/user';
  import {MUTATIONTYPES} from '../store';

  export default {
    data() {
      return {
        loginFormInfo: {
          userName: '',
          password: ''
        },
        requiredRule: [
          {validate: (val) => !!val, message: '必须填写用户名'}
        ],
        requiredRule2: [
          {validate: (val) => !!val, message: '必须填写密码'}
        ]
      };
    },
    methods: {
      login() {
        if(this.$refs.form.validate()){
          UserApi.login(this.loginFormInfo)
            .then(res => {
              this.toastr.success('登录成功!', 'Success');
              this.$store.commit(MUTATIONTYPES.UPDATE_USER_INFO, res);
              this.$router.push({name: 'home'});
            });
        }
      }
    }
  };
</script>
<style lang="scss">
  .login {
    .mu-form-item-help {
      left: 56px !important;
    }
  }
</style>
