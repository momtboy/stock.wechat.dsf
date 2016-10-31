<script>
    import contactmask from './contactMask.vue';
    import promptmask from './promptMask.vue';
    import toast from './toast.vue'

    export default {
        name:'Product',
        props:{
            productbtn:{
              type: Boolean
            },
            content: {
                type: Object
            },
            services: {
                type: Array
            },
            asc_id:{
                type: String
            },
            Urldata:{
                type: Object
            }
        },
        components:{
            contactmask,
            promptmask,
            toast
        },
       ready:function(){
            localStorage.openid = this.Urldata.openid;
            localStorage.nickname = this.Urldata.nickname;
        },
        data:function(){
            return {
                cBool:false,
                bool:false,
                tbool:false,
                toasttxt:''
            }
        },
        methods:{
            consult:function(){
                this.cBool=true
            }
        },
        events:{
            "showCpnt":function(data){  //提交成功后关闭contactmask弹窗，显示promptmask弹窗
                this.cBool = data;
                this.bool = true;
            },
            "hidep":function(data){  //隐藏promptmask弹窗
                this.bool = data;
            },
            "hidec":function(data){  //隐藏contactmask弹窗
                this.cBool = false;
            },
            "showToast":function(data){ //重复提交，关闭contactmask弹窗，打开toast弹窗
                this.toasttxt = "合格理财顾问将尽快与您联系，请勿重复提交";
                this.cBool = false;
                this.tbool = data;
            },
            "errToast":function(txt){    //获取用户信息出错
                this.toasttxt = txt;
                this.cBool = false;
                this.tbool = true;
            },
            "hideToast":function(data){  //隐藏toast弹窗
                this.tbool = data;
            },
            "showBtn":function(data){
                console.log('我是data:'+data);
            }
        }
    }
</script>

<template>
    <div class="mui-content">
        <contactmask v-show="cBool" transition="fade"></contactmask>
        <promptmask v-show="bool" transition="fade"></promptmask>
        <toast :toastTxt="toasttxt" v-show="tbool" transition="fade"></toast>
        <div class="product-banner">
            <img :src="content.banner">
        </div>
        <div class="content-block-title">核心价值</div>
        <div class="content-box clearfix">
            <img class="mui-pull-left" :src="content.imageSrc">
            <div class="product-content mui-pull-left">
                <p class="product-name" v-text="content.name"></p>
                <p class="product-info" v-text="content.info"></p>
            </div>
        </div>
        <div class="content-block-title">产品介绍</div>
        <div class="content-box">
            <section class="product-info" v-text="content.introduce"></section>
        </div>
        <div class="content-block-title">服务内容</div>
        <div class="content-box">
            <ul class="service-list">
                <li class="service-item clearfix" v-for="service in services">
                    <img class="mui-pull-left" :src="service.imgIcon">
                    <div class="service-content mui-pull-left">
                        <p :class=" 'color_' + $index " class="service-title" v-text="service.title"></p>
                        <p class="service-info" v-text="service.txt"></p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="btn">
            <a class="purchase-btn" v-link="{name:'Pay',params:{object_id:this.asc_id}}" v-show="productbtn"></a>
            <a class="consult-btn" @click="consult" v-show="!productbtn">立即咨询</a>
        </div>
    </div>
</template>