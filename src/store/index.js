import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import {setStorage, removeStorage} from '../utils/utils';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const MUTATIONTYPES = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_TITLE: 'UPDATE_TITLE'
};

export default new Vuex.Store({
  state: {
    title: '首页',
    userInfo: {},
    token: ''
  },
  mutations: {
    [MUTATIONTYPES.UPDATE_TITLE](state, payload) {
      state.title = payload;
    },
    [MUTATIONTYPES.UPDATE_USER_INFO](state, payload) {
      let {token, userInfo} = payload;
      if(token && userInfo){
        state.token = token;
        state.userInfo = userInfo;
        setStorage('token', token);
        setStorage('userInfo', userInfo);
      }else{
        state.token = '';
        state.userInfo = {};
        removeStorage('token');
        removeStorage('userInfo');
      }
    },
  },
  actions: {},
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
