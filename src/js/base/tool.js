var tool ={
    baseUrl: 'http://tps.api.guxiansheng.cn',      //产品接口url
    baseApi: 'http://trade.api.guxiansheng.cn',    //支付接口url

    /**
     * 获取url当中的参数
     * @param name
     * @returns {*}
     */
    getString:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
};
module.exports = tool;