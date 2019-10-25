<template>
    <div class="wrap">
        <ul>
            <li>
                <span>面试公司：</span>
                <span>{{detailData.company}}</span>
            </li>
            <li>
                <span>面试地址：</span>
                <span>{{detailData.address}}</span>
            </li>
            <li>
                <span>联系方式：</span>
                <span>{{detailData.phone}}</span>
            </li>
            <li>
                <span>是否提醒：</span>
                <span>{{detailData.remind===0?'已提醒':'未提醒'}}</span>
            </li>
            <li>
                <span>面试状态：</span>
                <span>{{detailData.status===0?'已打卡':(detailData.status===1?'已放弃':'未开始')}}</span>
            </li>
        </ul>
        <div class="message">
            <span>消息提醒</span>
            <switch @change="switchChange"/>
        </div>
        <div class="btn">
            <button @click="clockIn">去打卡</button>
            <button @click="abandon">放弃面试</button>
        </div>
        <button class="nav" @click="navigate">导航</button>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        data() {
            return {
                id:0,
                remind:-1,
            }
        },
        computed: {
            ...mapState('interview',['detailData'])
        },
        methods: {
            ...mapActions('interview',['getDetail','updateList']),
            abandon(){
                this.updateList({remind:this.remind,id:this.id,status:1})
                wx.navigateTo({ url: '/pages/interview/list' });
            },
            switchChange(e){
                this.remind = e.detail.value?0:-1
            },
            clockIn(){
                wx.navigateTo({ url: `/pages/interview/clock?company=${this.detailData.company}&address=${this.detailData.address}&latitude=${this.detailData.latitude}` });
            },
            navigate(){
                let plugin = requirePlugin('routePlan');
                let key = 'ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM';  //使用在腾讯位置服务申请的key
                let referer = '一面而就';   //调用插件的app的名称
                let endPoint = JSON.stringify({  //终点
                    'name': this.detailData.company,
                    'latitude': this.detailData.latitude,
                    'longitude': this.detailData.longitude
                });
                wx.navigateTo({
                    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
                });
            }
        },
        onLoad(option){
            this.id=option.id
            this.getDetail({id:option.id})
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    ul{
        padding: 10px 10px 0 10px;
        li{
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            display: flex;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-bottom: 1px solid #ccc;
            span:nth-of-type(1){
                flex: 3;
                color: #999;
                text-align: center;
            }
            span:nth-of-type(2){
                flex: 7;
            }
        }
    }
    .message{
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        font-size: 14px;
        border-bottom: 1px solid #ccc;
        span:nth-of-type(1){
            flex: 3;
            color: #999;
            text-align: center;
        }
        switch{
            flex: 7;
        }
    }
    .btn{
        height: 46px;
        display: flex;
        margin-top: 15px;
        button:nth-of-type(1){
            width: 45%;
            color: #fff;
            background-color: #2670bd;
        }
        button:nth-of-type(2){
            width: 45%;
            color: #fff;
            background-color: #e85757;
        }
    }
    .nav{
        margin-top: 10px;
    }
</style>