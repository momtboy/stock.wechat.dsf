<script>
  var tool = require('base/tool');
  import agreementmask from './product/agreementMask.vue';
  module.exports = {
    name:'Pay',
    components:{
      agreementmask
    },
    data:function(){
      return {
        ProductTitle:'',
        ProductDate:'',  //没有优惠时的到期日
        ProductTime:'',
        jyDate:'',   //交易日
        money:'',
        phoneNum:'',
        yqmInput:'',
        yzmInput:'',
        goods_id:'',
        sendBtn:'发送验证码',
        bool:false,
        mysecond:60,
        Pbool:false,            //支付协议
        checked:false,
        code_is_valid:'',
        giving_days:'',  //有优惠时的到期日
        orderNum:'',  //订单编号
        productIcon:''   //产品图标
      }
    },
    route:{
      data:function(transition){
        this.getproduct(function(){    //请求页面商品信息
          this.getExpireDate();  //请求页面到期天数
          this.pormpt();    //判断用户是否填写问卷和阅读协议
        });
        transition.next();
      },
      deactivate:function(transition){
        //离开当前页面的时候，清空页面内容，防止断网NAN
        this.phoneNum = '';
        this.ProductDate = '';
        this.jyDate = '';
        this.money = '';
        this.phoneNum = '';
        this.yqmInput = '';
        this.yzmInput = '';
        this.checked = false;
        //清除掉发送短信验证码倒计时
        this.mysecond = 0;
        transition.next();
      }
    },
    methods:{
      //风险提示
      pormpt:function(){
        var tipdata = {
          "openid":localStorage.openid
        }
        var _this = this;
        this.$http.jsonp('http://content.api.guxiansheng.cn/index.php?c=risk_wechat&a=isRisk',{params:tipdata}).then(function(res){
          if(res.data.code == 1){
            if(res.data.data == 0){    //未提交过风险评估
              _this.$route.router.go({name:'Snaq'});
            }else if(res.data.data == 1){   //未阅读支付协议
              //_this.Pbool = true;
              _this.$route.router.go({name:'Snaq'});
            }else if(res.data.data == 2){
              return;
            }else if(res.data.data == 3){
              _this.Pbool = true;
              //_this.$route.router.go({name:'Snaq'});
              //return;
            }
          }else{
            alert(res.data.message);
          }
        });
      },
      // WX获取商品信息ajax
      getproduct:function(callback){
        var data = {
          "goods_type":4,
          "object_id":this.$route.params.object_id  //支付对象的ID
        };
        this.$http.jsonp(tool.baseApi + '/index.php?c=wxbuy&a=get',{params:data}).then(function(res){
         if(res.data.code == 1){
           this.ProductDate = res.data.data.fms[0]; //几个月
           this.money = res.data.data.list[0].price; // 产品价格
           this.jyDate =  res.data.data.list[0].fm_name; //xx个交易日（计算有效期至要用）
           this.goods_id = res.data.data.list[0].goods_id;  //下面微信购买需要的参数
           this.productIcon = res.data.data.list[0].goods_img;
           this.ProductTitle = res.data.data.list[0].goods_name;
           typeof callback === "function" && callback.call(this);
         }else{
           alert(res.data.message);
         }
        },function(res){
          alert("服务器繁忙");
        })
      },
      //计算服务到期天数
      getExpireDate:function(){
        var data = {
          "asc_id":this.$route.params.object_id,
          "days":this.jyDate
        };
        this.$http.jsonp(tool.baseApi + '/index.php?c=wxbuy&a=remaining_agency_days',{params:data}).then(function(res){
          if(res.data.code == 1){
            this.ProductTime = res.data.data.to_days;  //购买后有效期至（没有优惠时的金额）
            this.giving_days = res.data.data.giving_days;//购买后有效期至（有优惠时的金额）
          }else{
            alert(res.data.message);
          }
        },function(err){
          alert("服务器繁忙");
        })
      },
      //WX购买页面购买第二步
      buy:function(event){
        var data = {
          "goods_id":this.goods_id,
          "code":this.yqmInput,
          "payment_code":"wxpay_gz",
          "phone":this.phoneNum,
          "yzm_code":this.yzmInput,
          "service_title":this.ProductTitle,
          "openid":tool.getString("openid"),
          "nickname":tool.getString("nickname")
        };
        var _self = this;
        this.$http.jsonp(tool.baseApi + '/index.php?c=wxbuy&a=step2',{params:data}).then(function(res){
          if(res.data.code == 1){
            this.code_is_valid = res.data.data.code_is_valid;
            this.orderNum = res.data.data.order_sn;
            var mydata = {
              "pay_sn":res.data.data.pay_sn,
              "member_id":res.data.data.member_id
            };
            //获取微信签名信息
            this.$http.jsonp(tool.baseApi + '/index.php?c=wxpayment&a=pay',{params:mydata}).then(function(res){
              if(res.data.code == 1){
                var config = res.data.data;
               //配置微信接口
                if (config != undefined && config != null) {
                  wx.config({
                    debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId :  config.appId, // 必填，appID公众号的唯一标识
                    timestamp : config.timeStamp, // 必填，生成签名的时间戳
                    nonceStr : config.nonceStr, // 必填，生成签名的随机串
                    signature : config.paySign,// 必填，签名，见附录1
                    jsApiList : [ 'chooseWXPay' ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2，如果出现permiss deline错误，就是因为这里没有配置相关接口原因
                  });
                  console.log('配置成功！');
                }
                wx.ready(function(){
                  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                  wx.chooseWXPay({
                    timestamp:config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
                   /* package: 'total_fee=' + this.money + '&fee_type=1&bank_type=WX&sign=' + config.sign +'&out_trade_no=' + this.orderNum + '&prepay_id=' + config.prepay_id ,*/
                    package:config.package,
                    // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    paySign: config.paySign, // 支付签名
                    signType:config.signType,
                    success: function (res) {
                      // 支付成功后的回调函数

                      var orderData = {
                        "orderNum":_self.orderNum,  //订单号（后台说后台返回）
                        "money":_self.money,  //购买金额
                      };
                      if(_self.code_is_valid == 0){  //没有优惠时
                        orderData.yxqdata = _self.ProductTime;  //有效期至
                      }else if(_self.code_is_valid == 1){  //有优惠时
                        orderData.yxqdata = _self.giving_days;
                      }
                      event.target.disabled=false;
                      _self.$route.router.go({name:'Pay_success',params:orderData}); //跳转到支付成功后的页面
                    },
                    error:function(err){
                      alert(err.data.message);
                      event.target.disabled=false;
                    }
                  });
                });
              }else{
                alert(res.data.message);
                event.target.disabled=false;
              }
            },function(err){
              alert("服务器繁忙");
              event.target.disabled=false;
            })
          }else{
            alert(res.data.message);
            event.target.disabled=false;
          }
        },function(err){
          alert("服务器繁忙");
          event.target.disabled=false;
        })
      },
      //验证手机号
      isPhone : function (phoneNo) {
        return /^1[3|4|5|7|8|][0-9]{9}$/.test(phoneNo);
      },
      //阅读协议
      protocol:function (){
        this.Pbool = true;
      },
      //发送验证码
      sendYzm:function(event){
        if(!this.isPhone(this.phoneNum)){
          alert('请输入正确的手机号');return;
        }
        //验证码效果变化
        var timer = setInterval(function(){
          if(this.mysecond > 0){
            this.mysecond--;
            this.sendBtn = '已发送'+ this.mysecond;
            this.bool = true;
          }else {
            this.sendBtn = '发送验证码';
            this.mysecond = 60;
            this.bool = false;
            clearInterval(timer);
            event.target.disabled = false;
          }
        }.bind(this),1000);

        if(!event.target.disabled){
          event.target.disabled = true;
          //请求验证码
          this.$http.jsonp(tool.baseApi + '/index.php?c=wxbuy&a=send',{params:{phone:this.phoneNum}}).then(function(res){
            if(res.data.code == 1){
              alert("验证码已发送！");
            }else{
              this.mysecond = 0;
              alert(res.data.message);
            }
          },function(err){
            alert('服务器繁忙');
          })
        }
      },
      //支付
      payBtn:function(event){
        if(this.phoneNum == ''){
          alert( '请输入手机号!');return;
        }
        if(!this.isPhone(this.phoneNum)){
          alert('请输入正确的手机号');return;
        }
        if(this.yzmInput == ''){
          alert('请输入验证码'); return;
        }
        if(!this.checked){
          alert('请阅读第三方风险揭示书及产品购买协议！'); return;
        }
        if(!event.target.disabled){
          event.target.disabled = true;
          this.buy(event);
        }
      }
    },
    events:{
      "protocolLayer":function(data){
        this.Pbool=data;
        //this.checked = true;
        var _self = this;
        this.$http.jsonp('http://content.api.guxiansheng.cn/index.php?c=risk_wechat&a=updateRisk',{params:{"open_id":localStorage.openid}}).then(function(res){
          if(res.data.code == 1){
            _self.checked = true;
          }else{
            alert(res.data.message);
          }
        },function(err){
          alert('服务器繁忙');
        });
      }
    }
  }
</script>

<template>
  <div class="PayPage">
    <agreementmask v-show="Pbool" transition="fade"></agreementmask>
    <div class="box">
      <img :src="productIcon" alt="" class="titleImg">
      <p class="title" v-text="ProductTitle"></p>
    </div>
    <div class="box">
      <div class="blueBtn" v-text="ProductDate"></div>
    </div>
    <div class="box sBox">
      <div class="l">购买后有效期至</div>
      <div class="ProductTime" v-text="ProductTime"></div>
    </div>
    <div class="box sBox mBox">
      <div class="l">支付金额</div>
      <div class="money">{{money | currency '¥' 2}}</div>
    </div>
    <div class="box inputBox">
      <div class="l lWord">账&nbsp;&nbsp;&nbsp;号</div>
      <input type="tel" placeholder="请输入手机号（必填）" class="input" v-model="phoneNum">
    </div>
    <div class="box inputBox">
      <div class="l lWord">验证码</div>
      <input type="text" placeholder="请输入验证码" class="input yzmInput" v-model="yzmInput">
      <button class="blueBtn yzm" @click="sendYzm($event)" v-text="sendBtn" :class="{'isClick':bool}"></button>
    </div>
    <div class="box inputBox">
      <div class="l lWord">邀请码</div>
      <input type="text" placeholder="如您有邀请码，请输入" class="input" v-model="yqmInput">
    </div>
    <div class="agreement">
      <label><input type="checkbox" class="checkbox" v-model="checked">我已同意<a href="javascript:void(0)" @click="protocol">第三方风险揭示书及产品购买协议</a></label>
    </div>
    <button class="payBtn" @click="payBtn($event)">微信支付</button>
  </div>
</template>
