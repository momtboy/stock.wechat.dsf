<template>
  <div class="promptLayer">
    <div class="mask"></div>
    <div class="contentBox">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
      <button class="submit" @click="ok">确认</button>
    </div>
  </div>
</template>

<script>

  export default {
    data: function() {
      return {
        title:'提示',
        content: '您的信息已收到，请等待我们与您联系！'
      }
    },
    methods:{
      ok:function(){
        this.$dispatch('hidep',false);
      },
      mask:function(){
        this.$dispatch('hidep',false);
      }
    }
  }
</script>