<script>
    module.exports ={
        name:'Pay_success',
        data:function(){
            return{
                productId:{
                    number:this.$route.params.orderNum,
                    price:this.$route.params.money,
                    time:this.$route.params.yxqdata
                },
                url:'http://a.app.qq.com/o/simple.jsp?pkgname=com.mrstock.mobile',
                pic1:"./dist/images/pic1.jpg",
                pic2:"./dist/images/pic2.jpg",
                pic3:"./dist/images/pic3.jpg"
            }
        }

    }
</script>

<template>
    <div class="mui-pay-success">
        <div class="pay-tips">
            <div class="pay-info">
                <p class="pay-txt">支付成功</p>
                <p>订单号：<span class="order-number" v-text="productId.number"></span></p>
                <p>支付金额：<span class="price" v-text="productId.price"></span>元</p>
                <p>有效期至：<span class="price" v-text="productId.time"></span></p>
            </div>
        </div>
        <div class="content-title">请下载股先生APP开始享受您的专属会员服务 </div>
        <div class="down-wrap">
            <p class="down-title">让理财成就永不止步的正确操作步骤</p>
            <ul>
                <li class="list-item">
                    <p class="list-title">第一步：前往应用商城下载股先生APP</p>
                    <img :src="pic1" alt="">
                    <div class="download-btn clearfix">
                        <a class="andrew mui-pull-left" :href="url">安卓下载</a>
                        <a class="apple mui-pull-right" :href="url">iOS下载</a>
                    </div>
                </li>
                <li class="list-item">
                    <p class="list-title">第二步：登录APP，并点击左上角头像图标进入个人中心</p>
                    <img :src="pic2" alt="">
                </li>
                <li class="list-item">
                    <p class="list-title">第三步：找到第三方机构，进入巨景金太阳查看购买的服
                        务内容</p>
                    <img :src="pic3" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>