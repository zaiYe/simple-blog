<template>
  <mu-container class="tc reg">
    <mu-form ref="form" :model="regFormInfo">
      <mu-form-item help-text="用户名长度大于3" prop="userName" :rules="usernameRules">
        <mu-text-field v-model="regFormInfo.userName" prop="userName" icon="account_circle" label="用户名"
                       label-float></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="email" :rules="emailRules">
        <mu-text-field v-model="regFormInfo.email" icon="locked" prop="email" label="邮箱" label-float></mu-text-field>
      </mu-form-item>
      <mu-form-item help-text="密码长度大于3小于10" prop="password" :rules="passwordRules">
        <mu-text-field v-model="regFormInfo.password" icon="locked" prop="password" label="密码"
                       label-float></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="repPassword" :rules="repPasswordRules">
        <mu-text-field v-model="regFormInfo.repPassword" icon="locked" prop="repPassword" label="重复密码"
                       label-float></mu-text-field>
      </mu-form-item>
      <mu-button @click="reg" color="primary">注册</mu-button>
      <mu-button @click="clear">重置</mu-button>
    </mu-form>
  </mu-container>
</template>
<script>
  import UserApi from '../services/user';
  import {MUTATIONTYPES} from '../store';

  export default {
    data() {
      return {
        regFormInfo: {
          userName: '',
          email: '',
          password: '',
          repPassword: ''
        },
        usernameRules: [
          {validate: (val) => !!val, message: '必须填写用户名'},
          {validate: (val) => val.length > 3, message: '用户名长度大于3'}
        ],
        emailRules: [
          {validate: (val) => !!val, message: '必须填写邮箱'}
        ],
        passwordRules: [
          {validate: (val) => !!val, message: '必须填写密码'},
          {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
        ],
        repPasswordRules: [
          {validate: (val) => !!val, message: '请再次填写密码'},
          {validate: (val) => val === this.regFormInfo.password, message: '两次密码不一致'}
        ]
      };
    },
    methods: {
      reg() {
        if (this.$refs.form.validate()) {
          let params = {
            userName: this.regFormInfo.userName,
            email: this.regFormInfo.email,
            password: this.regFormInfo.password
          };
          UserApi.reg(params)
            .then(res => {
              if (res) {
                this.toastr.success('注册成功!', 'Success');
                this.$store.commit(MUTATIONTYPES.UPDATE_USER_INFO, res);
                this.$router.replace({name: 'home'});
              }
            });
        }
      },
      clear() {
        this.$refs.form.clear();
        this.regFormInfo = {
          userName: '',
          email: '',
          password: '',
          repPassword: ''
        };
      }
    }
  };
</script>
<style lang="scss">
  .reg {
    .mu-form-item-help {
      left: 56px !important;
    }
  }
</style>
