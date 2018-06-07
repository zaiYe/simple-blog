// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Helpers from 'muse-ui/lib/Helpers';
// import theme from 'muse-ui/lib/theme';
import store, {MUTATIONTYPES} from './store';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

Vue.config.productionTip = false;

// theme.use('dark');

toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-top-right',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '3000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
};
Vue.prototype.toastr = toastr;

Vue.use(MuseUI);
Vue.use(Helpers);

router.beforeEach((to, from, next) => {
  let title = 'blog2';
  if (to.meta.title) {
    store.commit(MUTATIONTYPES.UPDATE_TITLE, to.meta.title);
    title = title + '-' + to.meta.title;
  }
  document.title = title;
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
