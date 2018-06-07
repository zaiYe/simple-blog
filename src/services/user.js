import api from './api';
import {getStorage} from '../utils/utils';

export const isLogin = !!getStorage('token');

export default {
  reg(data, ajaxOptions) {
    return api.axios(Object.assign({
      method: 'POST',
      url: '/api/user/reg',
      data: data
    }, ajaxOptions));
  },
  login(data, ajaxOptions){
    return api.axios(Object.assign({
      method: 'POST',
      url: '/api/user/login',
      data: data
    }, ajaxOptions));
  }
};
