<script>
    var tool = require('base/tool');
    import product from './product/index.vue';
    module.exports = {
        name:'Sd',
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
                    banner:'./dist/images/banner_sd.jpg',
                    imageSrc:'./dist/images/icon_sd.jpg',
                    name:'短线王之射雕 - 精准狙击',
                    info:'消息面刺激爆发牛股 弯弓射雕 笑傲股林',
                    introduce:'【短线王之射雕】是巨景·金太阳投研团队利用Alpha金融云数据全市场监测系统，一网打尽独家趋势热点，并结合金字塔分析模型七重筛选，通过股眼资金跟踪仪实时分解盘中主力资金抢筹动向，精准狙击消息面刺激最具短线爆发潜力牛股。俱往矣，数风流人物，还看今朝。市场热点林林总总，游资疯狂接力催生金雕飞天，独自追热点提心吊胆，何不祭出神器弯弓射雕，笑傲股林。'
                },
                services: [
                    {imgIcon:'./dist/images/sd1.png',title:'【射雕英雄】',txt:'金字塔分析模型七重筛选，结合股眼资金跟踪仪，精准建仓爆发牛股'},
                    {imgIcon:'./dist/images/sd2.png',title:'【射雕早讯】',txt:'第III代多层级信息过滤平台，甄选刺激股价上涨资讯，热点一网打尽'},
                    {imgIcon:'./dist/images/sd3.png',title:'【射雕内参】',txt:'巨景金太阳万花筒内参数据库，互通互联各大机构，扭转信息劣势'},
                    {imgIcon:'./dist/images/sd4.png',title:'【涨停倒计时】',txt:'首创魔方极速策略，精选尾盘冲击涨停个股，助市值快速翻倍'},
                    {imgIcon:'./dist/images/sd5.png',title:'【动态仓位控制】',txt:'独创动态仓位控制模型，有效规避风险，保障资金安全'},
                    {imgIcon:'./dist/images/sd6.png',title:'【神雕侠侣】',txt:'专属分析师团队面对面答疑，量身定制每日最优操作策略'}
                ]
            }
        },
        methods:{
            //判断商品是否可以购买
            purchase:function(){
                this.$http.jsonp(tool.baseUrl + '/index.php?c=agency_list&a=check_is_buy',{params:{code:"sd"}}).then(function(res){
                    if(res.data.code == 1){   //请求成功
                        this.asc_id = res.data.data.asc_id;    //产品id
                        this.agency_id = res.data.data.agency_id;   //获取机构id
                        if(res.data.data.is_support_buy==1){
                            this.productbtn = true;     //显示购买按钮
                        }else if(res.data.data.is_support_buy==0){
                            this.productbtn = false;   //显示咨询按钮
                        }
                    }else {
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