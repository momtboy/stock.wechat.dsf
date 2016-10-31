<script>
	var tool = require('base/tool');
	import product from './product/index.vue';
	module.exports = {
		name:'X5',
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
					banner:'./dist/images/banner.jpg',
					imageSrc:'./dist/images/icon.jpg',
					name:'X5 尊享版',
					info:'智慧的投资方式 精准的操作手法',
					introduce:'X5尊享版是巨景·金太阳根据广大投资者的投资习惯，通过大数据分析，精心研发的一档低门槛体验投顾产品。旨在提供最新热点狙击，多维度监控市场主力资金流向，优选行业股票池，根据市场动向精准制定操作策略等全方位的投顾服务，辅以科学严格的风控系统，让您的资金账户牛得起，守得住！'
				},
				services: [
					{imgIcon:'./dist/images/service_icon.png',title:'【赢在开盘前】',txt:'通过集合竞价抓当日黑马，挖掘潜力板块及龙头'},
					{imgIcon:'./dist/images/service_icon2.png',title:'【盘中买卖点提示】',txt:'根据个股盘中走势，精确提供买卖点'},
					{imgIcon:'./dist/images/service_icon3.png',title:'【淘金两点半】',txt:'尾盘半小时异动个股精选，轻松赚取隔夜收益'},
					{imgIcon:'./dist/images/service_icon4.png',title:'【慧眼跟庄】',txt:'监测资金流向，识别主力踪迹，破解主力陷阱，从此追涨不被套'},
					{imgIcon:'./dist/images/service_icon5.png',title:'【绝密独家内参】',txt:'金牌调研团队一手绝密研报，全方位把握上市公司动向'},
					{imgIcon:'./dist/images/service_icon6.png',title:'【金牌投顾面对面】',txt:'首席分析师面对面诊股答疑'}
				]
			}
		},
		methods:{
			//判断商品是否可以购买
			purchase:function(){
				this.$http.jsonp(tool.baseUrl + '/index.php?c=agency_list&a=check_is_buy',{params:{code:"x5"}}).then(function(res){
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