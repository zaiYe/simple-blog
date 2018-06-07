<template>
  <div id="app">
    <mu-drawer :open.sync="isOpen" :docked="false" :right="false" class="slider-bar">
      <mu-list>
        <mu-list-item exact active-class="link-active-class" :to="{name: item.path}" button :ripple="false"
                      v-for="(item,index) in menuList" :key="index" v-if="item.isShow" @click="isOpen = false">
          <mu-list-item-action>
            <mu-icon color="#000" :value="item.icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{item.title}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
    <mu-appbar style="width: 100%;" color="primary" class="header-bar">
      <mu-button slot="left" icon @click="isOpen = !isOpen" class="show-slider-btn">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <h2 class="title">{{$store.state.title}}</h2>
      <mu-button slot="right" @click="openLoginOut = true" v-show="isLogin">
        登出
        <mu-icon value="cancel"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="app-content">
      <mu-scale-transition>
        <router-view/>
      </mu-scale-transition>
    </div>
    <mu-dialog title="退出登录" width="600" max-width="80%" :append-body="true" :open.sync="openLoginOut">
      确定退出登录？
      <mu-button slot="actions" @click="openLoginOut = false">
        <mu-icon right value="undo"></mu-icon>
        取消
      </mu-button>
      <mu-button slot="actions" color="primary" @click="loginOut">
        <mu-icon right value="check"></mu-icon>
        确定
      </mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import {getStorage} from './utils/utils';
  import {MUTATIONTYPES} from './store';
  import {mapState} from 'vuex';

  export default {
    name: 'App',
    data() {
      return {
        isOpen: false,
        isLogin: false,
        openLoginOut: false
      };
    },
    created() {
      this.init();
      console.info('-------------初始化完成-------------');
    },
    computed: {
      ...mapState(['token']),
      menuList() {
        let isLogin = this.isLogin;
        return [
          {
            icon: 'home',
            title: '首页',
            path: 'home',
            isShow: true
          },
          {
            icon: 'send',
            title: '发表',
            path: 'post',
            isShow: isLogin
          },
          {
            icon: 'list',
            title: '我的列表',
            path: 'list',
            isShow: isLogin
          },
          {
            icon: 'account_box',
            title: '注册',
            path: 'reg',
            isShow: !isLogin
          },
          {
            icon: 'face',
            title: '登录',
            path: 'login',
            isShow: !isLogin
          }
        ];
      }
    },
    watch: {
      token(val) {
        this.isLogin = (val && val.trim() !== '');
      }
    },
    methods: {
      init() {
        let token = getStorage('token'),
          userInfo = getStorage('userInfo');
        if (token && userInfo) {
          this.$store.commit(MUTATIONTYPES.UPDATE_USER_INFO, {token, userInfo});
        } else {
          this.$store.commit(MUTATIONTYPES.UPDATE_USER_INFO, {});
        }
      },
      loginOut() {
        this.openLoginOut = false;
        this.$store.commit(MUTATIONTYPES.UPDATE_USER_INFO, {});
        this.toastr.success('登出成功!', 'Success');
        this.$router.push('/');
      }
    }
  };
</script>
<style lang="scss">
  @import "assets/scss/app.scss";
</style>
<style scoped lang="scss">
  #app {
    min-height: 100vh;
  }

  .header-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }

  h2.title {
    font-weight: normal;
    font-size: 20px;
    text-align: center;
  }

  .list-wrap {
    max-width: 360px;
    transition: all 0.3s;
    &.small {
      max-width: 56px;
    }
  }

  .app-content {
    position: relative;
    transition: all .45s cubic-bezier(.23, 1, .32, 1);
    padding-top: 56px;
    > div {
      position: absolute;
      left: 0;
      right: 0;
    }
  }

  @media (min-width: 600px) {
    .app-content {
      padding-top: 64px;
    }
  }
  @media (min-width: 900px) {
    .show-slider-btn{
      display: none;
    }
    .header-bar, .app-content, .app-content > div {
      padding-left: 256px;
    }
    .slider-bar {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
  }
</style>
