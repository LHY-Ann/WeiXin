<template>
    <div class="wrap">
        <sign-map class="sign-map" :markers="markers"></sign-map>
        <button>打卡</button>
    </div>
</template>

<script>
    import { signMap } from '../../components/sign-map'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                markers: []
            }
        },
        components: {
            signMap
        },
        computed: {
            ...mapState('interview',['detailData'])
        },
        onShow(){
            let { company, address, latitude, longitude } = this.detailData;
            wx.setNavigationBarTitle({ title: company });
            this.markers = [{
                latitude,
                longitude,
                width: 25,
                height: 25,
                title: company,
                iconPath: 'https://www.apple.com/favicon.ico'
            }]
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    button{
        height: 100rpx;
        width: 100%;
        background: #000;
        color: #fff;
    }
    button.active{
        color: green;
    }
    .sign-map{
        flex: 1;
        width: 100%;
    }
</style>