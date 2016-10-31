<script>
    var tool = require('base/tool');
    import product from './product/index.vue';
    module.exports = {
        name:'Dxw',
        components:{
            product
        },
        created:function(){
            this.purchase();
        },
        data:function(){
            return {
                Urldata:{
                    openid:tool.getString("openid"),
                    nickname:tool.getString("nickname")
                },
                asc_id:"",
                agency_id:"",
                productbtn:false,
                content: {
                    banner:'./dist/images/banner_dxw.jpg',
                    imageSrc:'./dist/images/icon_dxw.jpg',
                    name:'短线王之风云 - 技术面锁定',
                    info:'短线起爆牛股 股之短利 必出风云',
                    introduce:'【短线王之风云】是巨景·金太阳投研团队利用超级金融云18级运算，通过对股票池主力资金跟踪超90个交易日，从技术面锁定短线起爆牛股，帮助投资者实现稳健的短线盈利。三人行，必有我师！股语曰：股之短利，必出风云。与其独自苦苦研股，不如与风云同行，做股之快乐！'
                },
                services: [
                    {imgIcon:'./dist/images/dxw_icon.png',title:'【风云燃爆】',txt:'超级金融云18级运算，通过主力资金燃爆系数精选短线牛股'},
                    {imgIcon:'./dist/images/dxw_icon2.png',title:'【风云早讯】',txt:'BD大数据层级过滤系统，24小时不间断抓取财经新闻，优化后推送'},
                    {imgIcon:'./dist/images/dxw_icon3.png',title:'【风云内参】',txt:'Alpha86智能研报数据库，同步交易所，最快、最新、最全'},
                    {imgIcon:'./dist/images/dxw_icon4.png',title:'【狙击竞价涨停】',txt:'利用波动方程对集合竞价数据进行多重推演，精准狙击早盘涨停个股'},
                    {imgIcon:'./dist/images/dxw_icon5.png',title:'【定向止盈止损】',txt:'V12人工金融高投对个股全面监控，及时提供短线定向建议止盈止损价'},
                    {imgIcon:'./dist/images/dxw_icon6.png',title:'【风云猎庄行】',txt:'8X8阵列雷达盯盘系统，准确锁定主力动向，享受主力资金抬轿'}
                ]
            }
        },
        methods:{
            //判断商品是否可以购买
            purchase:function(){
                this.$http.jsonp(tool.baseUrl + '/index.php?c=agency_list&a=check_is_buy',{params:{code:"fy"}}).then(function(res){
                    if(res.data.code == 1){   //请求成功
                        this.asc_id = res.data.data.asc_id;    //产品id
                        this.agency_id = res.data.data.agency_id;   //获取机构id
                        if(res.data.data.is_support_buy==1){
                            this.productbtn = true;     //显示购买按钮
                        }else if(res.data.data.is_support_buy==0){
                            this.productbtn = false;   //显示咨询按钮
                        }
                    }else{
                        alert(res.data.message);
                    }
                },function(err){
                    alert("服务器繁忙！");
                })
            }
        },
        events:{
            "confirm":function (phoneNum){
                this.$http.jsonp(tool.baseUrl + '/index.php?c=agency_list&a=addMemberService',{params:{agency_id:this.agency_id,member_mobile:phoneNum,title:"x5"}}).then(function(res){
                    if(res.data.code == 1){           //提交成功
                        this.$broadcast('showCpnt',false);
                    }else if(res.data.code == 2){         //同一用户一天只能咨询一次
                        this.$broadcast('showToast',true);
                    }else if(res.data.code == -1){    //获取用户信息失败
                        this.$broadcast('errToast',res.data.message);
                    }else{
                        alert(res.data.message);
                    }
                },function(err){
                    alert("服务器繁忙！");
                })
            }
        }
    }
</script>

<template>
    <div class="mui-product-content">
        <product :content="content" :services="services" :productBtn="productbtn" :Urldata="Urldata" :asc_id="asc_id"></product>
    </div>
</template>