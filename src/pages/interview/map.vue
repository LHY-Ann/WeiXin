<template>
    <div class="address">
        <div class="head">
            <span>北京</span>
            <input placeholder="面试地址" v-model="ipt" @input="iptChange"/>
        </div>
        <ul>
            <li v-for="item in list" :key="item.id" @click="addressChoose(item)">
                <p>{{item.title}}</p>
                <p>{{item.address}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import QQMapWX from '../../util/qqmap-wx-jssdk.min.js';
    import Throttle from '../../util/throttle'
    export default {
        data() {
            return {
                longitude: 116.29845,
                latitude: 39.95933,
                ipt:'',
                list:[],
                qqmapsdk:null
            }
        },
        created() {
            // 实例化API核心类
            this.qqmapsdk = new QQMapWX({
                key: 'ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM'
            });
        },
        methods: {
            ...mapMutations('interview',['setAddress']),
            addressChoose(item){
                this.setAddress(item)
                wx.navigateTo({ url: '/pages/interview/index' });
            },
            iptChange(){
                Throttle(this.qqmap,this.ipt)
            },
            qqmap(ipt){
                this.qqmapsdk.getSuggestion({
                    //获取输入框值并设置keyword参数
                    keyword: ipt, //用户输入的关键词，可设置固定值,如keyword:'KFC'
                    //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
                    success: (res)=> {//搜索成功后的回调
                        this.list=res.data
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .address{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .head{
        height: 40px;
        line-height: 40px;
        display: flex;
        font-size: 14px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        span{
            display: inline-block;
            width: 20%;
            text-align: center;
            border-right: 1px solid #ccc;
        }
        input{
            flex: 1;
            height: 40px;
            padding-left: 10px;
        }
    }
    map{
        width: 100%;
        height: 92%;
    }
    ul{
        width: 100%;
        height: auto;
        li{
            width: 93%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            padding:0 10px;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-bottom: 1px solid #ccc;
            p:nth-of-type(2){
                color: #999;
            }
        }
    }
</style>