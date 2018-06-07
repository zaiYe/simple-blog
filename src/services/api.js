import axios from 'axios';
import AppConfig from '../config/config';
import toastr from 'toastr';
import {getStorage} from '../utils/utils';

axios.defaults.timeout = AppConfig.apiTimeout;
axios.interceptors.request.use(config => {
  const token = getStorage('token') || null;
  if(token){
    config.headers["Authorization"] = token;
  }
  return config;
});
axios.interceptors.response.use(res => {
  if (res.status >= 200 && res.status < 300) {
    if (res.data.success) {
      return Promise.resolve(res.data.data);
    } else {
      toastr.error(res.data.msg, 'Error');
      return Promise.reject(res.data);
    }
  }else{
    toastr.error(res.status, 'Error');
    return Promise.reject(res.status);
  }
});

export default {
  axios: axios,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
