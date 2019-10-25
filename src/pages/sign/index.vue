<template>
    <div class="wrap">
        <!-- <map name="map" show-location=true :longitude="longitude" :latitude="latitude"></map> -->
        <sign-map class="sign-map"></sign-map>
        <div class="content" @click="pepole">个人中心</div>
        <footer @click="interview">添加面试</footer>
    </div>
</template>

<script>
import {signMap} from '../../components/sign-map'
import QQMapWX from '../../util/qqmap-wx-jssdk.min.js';
export default {
    // data(){
    //     return {
    //         longitude: 116.29845,
    //         latitude: 39.95933
    //     }
    // },
    components: {
        signMap
    },
    methods: {
        interview(){
             wx.navigateTo({ url: '/pages/interview/index' });
        },
        pepole(){
            wx.navigateTo({ url: '/pages/mine/index' });
        }
        // goTabBar(){
        //     uni.switchTab({
        //         url: '/pages/tabBar/component/component'
        //     })
        // }
    },
    // async created(){
    //     // 判断是否需要指纹识别
    //     let fingerInfo = wx.getStorageSync('finger');
    //     if (!fingerInfo || !fingerInfo.finger || +new Date() - fingerInfo.timestamp > 24*60*60*1000){
    //         wx.navigateTo({ url: '/pages/finger/index' });
    //         return;
    //     }
    // }
}
</script>


<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
    }
    .sign-map {
        width: 100%;
        height: 94%;
        display: block;
    }
    // map{
    //     width: 100%;
    //     height: 94%;
    // }
    .content{
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        border-radius: 50%;
        position: fixed;
        right: 20px;
        bottom: 50px;
        background-color: #fff;
    }
    footer{
        width: 100%;
        height: 6%;
        line-height: -1%;
        font-size: 16px;
        text-align: center;
        color: #fff;
        background-color: #000;
    }
</style>