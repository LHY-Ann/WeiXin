<template>
    <div class="wrap">
        <div v-if="flag">
            <div class="phone">
                <div></div>
                <div>{{phone}}</div>
            </div>
            <div class="item" @click="myinterview">
                <icon type="waiting" size="20" class="icon"/>
                <span>我的面试</span>
                <span>></span>
            </div>
            <button class="service" open-type="contact">
                <icon type="info" size="20" class="icon"/>
                <span>客服中心</span>
                <span>></span>
            </button>
        </div>
        <button v-else open-type="getPhoneNumber" @getphonenumber="phoneNumber">获取手机号</button>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        data() {
            return {
                flag:false
            }
        },
        computed: {
            ...mapState('user',['phone'])
        },
        methods: {
            ...mapActions('user',['getPhone']),
            phoneNumber (res) {
                let { iv, encryptedData, errMsg }=res.detail
                if(errMsg==='getPhoneNumber:ok'){
                    this.getPhone({ iv, encryptedData })
                    this.flag=true
                }else{
                    this.flag=false
                }
            },
            myinterview(){
                wx.navigateTo({ url: '/pages/interview/list' });
            }
        },  
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .phone{
        width: 100%;
        height: 100px;
        margin: 0 auto;
        float: left;
        background-color: #eeeeee;
        div:nth-of-type(1){
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 10px auto;
            background-color: aqua;
        }
        div:nth-of-type(2){
            font-size: 14px;
            text-align: center;
        }
    }
    .item{
        clear: both;
        height: 50px;
        line-height: 50px;
        .icon{
            width: 20%;
            text-align: center;
        }
        span:nth-of-type(1){
            display: inline-block;
            width: 60%;
            font-size: 14px;
        }
        span:nth-of-type(2){
            display: inline-block;
            width: 20%;
            font-size: 20px;
            color: #999;
        }
    }
    .service{
        height: 50px;
        line-height: 50px;
        border-radius: 0px;
        padding: 0;
        margin: 0;
        font-size: 14px;
        background-color: #fff;
        .icon{
            width: 20%;
            text-align: center;
        }
        span:nth-of-type(1){
            display: inline-block;
            width: 60%;
            font-size: 14px;
            text-align: left;
        }
        span:nth-of-type(2){
            display: inline-block;
            width: 20%;
            font-size: 20px;
            color: #999;
            text-align: left;
        }
    }
</style>