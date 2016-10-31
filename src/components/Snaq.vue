<script>
    module.exports = {
        name : 'Snaq',
        data:function(){
            return {
                snaq:{
                    problem1 : "1",
                    problem2: "1",
                    problem3: "1",
                    problem4: "1",
                    problem5: "1",
                    problem6: "1"
                }
            }
        },
        methods:{
            submit:function(event){
                if(!event.target.disabled){
                    event.target.disabled = true;
                    if(window.app != null && window.app != undefined){
                        window.app.getContent(this.snaq.problem1 + "," + this.snaq.problem2 + "," + this.snaq.problem3 + "," + this.snaq.problem4 + "," + this.snaq.problem5 + "," + this.snaq.problem6);
                    }else{
                        var snaqData = {
                            "open_id": localStorage.openid,
                            "nikename": localStorage.nickname,
                            "json":[
                                this.snaq.problem1,
                                this.snaq.problem2,
                                this.snaq.problem3,
                                this.snaq.problem4,
                                this.snaq.problem5,
                                this.snaq.problem6
                            ]
                        }
                        console.log(typeof snaqData.json);
                        console.log(snaqData);
                        this.$http.jsonp('http://content.api.guxiansheng.cn/index.php?c=risk_wechat&a=addRiskWechat',{params:snaqData}).then(function(res){
                            console.log(res.data);
                            if(res.data.code == 1){
                                event.target.disabled = false;
                                if(res.data.data == 1){
                                    this.$route.router.go({name:'Pay'});
                                }
                            }else{
                                alert(res.data.message)
                                event.target.disabled = false;
                            }
                        },function(err){
                            alert('服务器繁忙');
                        });
                    }
                }
            }
        }
    }
</script>

<template>
    <div class="snaq-wrap">
        <div class="top"></div>
        <div class="content">
            <div class="item">
                <h3>1.请问您的年龄处于：</h3>
                <label><input type="radio" name="problem1" value="1" v-model="snaq.problem1"><span>30岁以下</span></label>
                <label><input type="radio" name="problem1" value="2" v-model="snaq.problem1"><span>31-40岁</span></label>
                <label><input type="radio" name="problem1" value="3" v-model="snaq.problem1"><span>41-50岁</span></label>
                <label><input type="radio" name="problem1" value="4" v-model="snaq.problem1"><span>51-60岁</span></label>
                <label><input type="radio" name="problem1" value="5" v-model="snaq.problem1"><span>60岁以上</span></label>
            </div>
            <div class="item">
                <h3>2.您家庭预计进行证券投资的资金占家庭现有总资产（不含自住、自用房产及汽车等固定资产）的比例是：</h3>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="1"><span>70%以上</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="2"><span>50%-70%</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="3"><span>30%-50%</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="4"><span>10%-30%</span></label>
                <label><input type="radio" name="problem2" v-model="snaq.problem2" value="5"><span>10%以下</span></label>
            </div>
            <div class="item">
                <h3>3.当您独自到外地游玩，遇到三岔路口，您会选择：</h3>
                <label><input type="radio" name="problem3" value="1" v-model="snaq.problem3"><span>仔细研究地图和路标</span></label>
                <label><input type="radio" name="problem3" value="2" v-model="snaq.problem3"><span>找别人问路</span></label>
                <label><input type="radio" name="problem3" value="3" v-model="snaq.problem3"><span>大致判断一下方向</span></label>
                <label><input type="radio" name="problem3" value="4" v-model="snaq.problem3"><span>也许会用掷骰子的方式来做决定</span></label>
            </div>
            <div class="item">
                <h3>4.假设有两种不同的投资：投资A预期获得5%的收益，有可能承担非常小的损失；投资B预期获得20%。假如您前期用25元购入一只股票，该股现在升到30元，而根据预测该股近期有一半机会升到35元，另一半机会跌到25元，您现在会：</h3>
                <label><input type="radio" name="problem4" value="1" v-model="snaq.problem4"><span>立刻卖出</span></label>
                <label><input type="radio" name="problem4" value="2" v-model="snaq.problem4"><span>部分卖出</span></label>
                <label><input type="radio" name="problem4" value="3" v-model="snaq.problem4"><span>继续持有</span></label>
                <label><input type="radio" name="problem4" value="4" v-model="snaq.problem4"><span>继续买入</span></label>
            </div>
            <div class="item">
                <h3>5.当您进行投资时，您的首要目标是：</h3>
                <label><input type="radio" name="problem5" value="1" v-model="snaq.problem5"><span>资产保值，我不愿意承担任何投资风险</span></label>
                <label><input type="radio" name="problem5" value="2" v-model="snaq.problem5"><span>尽可能保证本金安全，不在乎收益率比较低</span></label>
                <label><input type="radio" name="problem5" value="3" v-model="snaq.problem5"><span>产生较多的收益，可以承担一定的投资风险</span></label>
                <label><input type="radio" name="problem5" value="4" v-model="snaq.problem5"><span>实现资产大幅增长，愿意承担很大的投资风险</span></label>
            </div>
            <div class="item">
                <h3>6.您的投资经验可以被概括为：</h3>
                <label><input type="radio" name="problem6" value="1" v-model="snaq.problem6"><span>有限：除银行活期账户和定期存款外，我基本没有其他投资经验</span></label>
                <label><input type="radio" name="problem6" value="2" v-model="snaq.problem6"><span>一般：除银行活期账户和定期存款外，我购买过基金、保险等理财产品，但还需要进一步的指导</span></label>
                <label><input type="radio" name="problem6" value="3" v-model="snaq.problem6"><span>丰富：我是一位有经验的投资者，参与过股票、基金等产品的交易，并倾向于自己做出投资决策</span></label>
                <label><input type="radio" name="problem6" value="4" v-model="snaq.problem6"><span>非常丰富:我是一位非常有经验的投资者，参与过权证、期货或创业板等高风险产品的交易</span></label>
            </div>
            <button class="submit" @click="submit($event)">提交问卷</button>
        </div>
    </div>
</template>