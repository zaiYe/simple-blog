import api from './api';

export default {
  post(data, ajaxOptions){
    return api.axios(Object.assign({
      method: 'POST',
      url: '/api/post',
      data: data
    }, ajaxOptions));
  },
  getUserPostList(ajaxOptions) {
    return api.axios(Object.assign({
      method: 'GET',
      url: '/api/post/userPostList'
    }, ajaxOptions));
  },
  getAllPost(ajaxOptions){
    return api.axios(Object.assign({
      method: 'GET',
      url: `/api/post`
    }, ajaxOptions));
  }
}
