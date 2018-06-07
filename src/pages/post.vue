<template>
  <mu-container class="tc post">
    <mu-form :model="postFormInfo" ref="form">
      <mu-form-item prop="title" :rules="requiredRule">
        <mu-text-field v-model="postFormInfo.title" prop="title" icon="title" label="标题"
                       label-float></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="content" :rules="requiredRule2">
        <mu-text-field multi-line :rows="1" :rows-max="5" :max-length="100" v-model="postFormInfo.content" prop="content" icon="insert_drive_file" label="内容"
                       label-float></mu-text-field>
      </mu-form-item>
      <mu-button color="primary" @click="send">发表</mu-button>
    </mu-form>
  </mu-container>
</template>
<script>
  import PostApi from '../services/post';

  export default {
    data() {
      return {
        postFormInfo:{
          title: '',
          content: ''
        },
        requiredRule: [
          {validate: (val) => !!val, message: '必须填写标题'}
        ],
        requiredRule2: [
          {validate: (val) => !!val, message: '必须填写内容'},
          {validate: (val) => val.length > 10 && val.length <= 100, message: '内容必须大于10个字且少于等于100个字'}
        ],
      };
    },
    mounted() {

    },
    methods: {
      send(){
        if(this.$refs.form.validate()){
          PostApi.post(this.postFormInfo)
            .then(res => {
              if(res){
                this.toastr.success('发表成功!', 'Success');
                this.$router.push('/');
              }
            })
        }
      }
    }
  };
</script>
<style lang="scss">
  .post {
    .mu-form-item-help {
      left: 56px !important;
    }
  }
</style>
