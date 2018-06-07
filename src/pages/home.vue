<template>
  <mu-container>
    <mu-card style="width: 100%; margin: 0 auto 10px;" v-for="(item,index) in postList" :key="index">
      <mu-card-header :title="item.auth">
      </mu-card-header>
      <mu-card-title :title="item.title" :sub-title="'发表时间:' + item.created_at"></mu-card-title>
      <mu-card-text>{{item.content}}</mu-card-text>
    </mu-card>
  </mu-container>
</template>
<script>
  import PostApi from '../services/post';

  export default {
    data() {
      return {
        postList: []
      };
    },
    created() {
      this.getPost();
    },
    methods: {
      getPost(){
        PostApi.getAllPost()
          .then(res => {
            this.postList = res;
          })
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
