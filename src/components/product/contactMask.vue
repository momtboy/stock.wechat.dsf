<template>
  <div class="contactLayer">
    <div class="mask"></div>
    <div class="contentBox">
      <h3 class="title" v-text="title"></h3>
      <div class="content">
        <input type="tel" class="phoneInput" placeholder="请输入联系电话" v-model="phoneNum">
        <p class="err" v-text="errText"></p>
        <div class="contentText" v-text="contentText"></div>
      </div>
      <div class="btnBox">
        <button class="btnLeft" @click="mask" v-text="cancel"></button>
        <button class="btnRight" @click="ok($event)" v-text="yes"></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        title:'联系信息',
        contentText: '请留下您的手机号码，合格理财顾问12小时内将与您联系，请保持电话畅通，留意接听号码：028-61255555的来电，人人都做合格投资者。顾上高人，你就是高人',
        phoneNum:'',
        cancel:'取消',
        yes:'确认',
        errText:''
      }
    },
    methods:{
      ok:function(){ //点击确认按钮
        var isPhone = function (phoneNo) {
          return /^1[3|4|5|7|8|][0-9]{9}$/.test(phoneNo);
        };
        if(this.phoneNum == ""){
          this.errText = '请输入手机号！';
          return;
        }
        if(!isPhone(this.phoneNum)){
          this.errText = '请输入正确的手机号码！';
          return;
        }
        this.errText = "";
        this.$dispatch('confirm',this.phoneNum);
        this.phoneNum = '';
      },
      mask:function(){  //点击遮罩层或者取消按钮
        this.$dispatch('hidec',false);
        this.phoneNum = '';
        this.errText = "";
      }
    }
  }
</script>
