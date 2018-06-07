import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: '首页'},
      component: resolve => require(['../pages/home.vue'], resolve)
    },
    {
      path: '/post',
      name: 'post',
      meta: {title: '发表文章'},
      component: resolve => require(['../pages/post.vue'], resolve)
    },
    {
      path: '/list',
      name: 'list',
      meta: {title: '文章列表'},
      component: resolve => require(['../pages/list.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      meta: {title: '登录'},
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    {
      path: '/reg',
      name: 'reg',
      meta: {title: '注册'},
      component: resolve => require(['../pages/reg.vue'], resolve)
    }
  ]
});

export default router;
