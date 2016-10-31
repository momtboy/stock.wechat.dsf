<script>
    var tool = require('base/tool');
    import product from './product/index.vue';
    module.exports = {
        name:'Cq',
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
                    banner:'./dist/images/banner_cq.jpg',
                    imageSrc:'./dist/images/icon_cq.jpg',
                    name:'中短线之传奇 - 紧随游资接力龙头',
                    info:'波段操作，再现复利之传奇',
                    introduce:'【短线王之传奇】是巨景·金太阳投研团队利用量化策略研究中心所搭建的脉动阵列计算机平台，辅以策略团队历经10年所研发的“龙威云端分析指标”，精准锁定游资接力龙头，反复波段操作，实现资产快速翻倍！醉卧沙场君莫笑，古来征战几人回。与其捂股不动来回坐电梯，何不与传奇一起成就股林霸业，再现复利之传奇。'
                },
                services: [
                    {imgIcon:'./dist/images/cq1.png',title:'【传奇龙威】  ',txt:'脉动阵列计算机实时演算分析，寻找强势龙头，紧抓暴涨机会'},
                    {imgIcon:'./dist/images/cq2.png',title:'【传奇资讯】',txt:'第II代传奇信息采集系统，覆盖上千数据源，提供最强信息保障'},
                    {imgIcon:'./dist/images/cq3.png',title:'【传奇内参】',txt:'蜂巢内参数据云平台，直击机构观点，投资无懈可击'},
                    {imgIcon:'./dist/images/cq4.png',title:'【龙头助选】',txt:'龙威云端分析指标，精选龙头牛股，无视大盘震荡，弱势行情也能大涨'},
                    {imgIcon:'./dist/images/cq5.png',title:'【波段为王】',txt:'实时匹配数百万张个股分时图谱，三重优化，高抛低吸，穿越牛熊'},
                    {imgIcon:'./dist/images/cq6.png',title:'【传奇屠龙刀】',txt:'巨景金太阳耗时10年研发适应各类投资人群的成熟投资模型，稳定盈利'}
                ]
            }
        },
        methods:{
            //判断商品是否可以购买
            purchase:function(){
                this.$http.jsonp(tool.baseUrl + '/index.php?c=agency_list&a=check_is_buy',{params:{code:"cq"}}).then(function(res){
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