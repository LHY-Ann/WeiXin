<template>
    <div class="wrap">
        <map 
            name="map"
            show-location="true" 
            :longitude="longitude" 
            :latitude="latitude"
            :include-points="points"
            :markers="markers"
            :circles="circle"></map>
        <cover-view>
            <cover-image class="location" @click="location" src="/static/location.png" />
        </cover-view>
    </div>
</template>


<script>
export default {
    name: 'sign-map',
    data(){
        return {
            longitude: 116.29845,
            latitude: 39.95933
        }
    },
    computed: {
        points(){
            return [{longitude: this.longitude,latitude: this.latitude}, ...this.markers]
        },
        circle(){
            return this.markers.map(item=>{
                let {latitude, longitude} = item;
                return {
                    latitude,
                    longitude,
                    color: '#FF6600',
                    fillColor:'#ffffffAA',
                    radius: 500,
                    strokeWidth: 5
                }
            })
        }
    },
    props: {
        markers: {
            type: Array,
            default: []
        }
    },
    created(){
        //获取自己的位置
        this.location();
    },
    methods: {
        location(){
            wx.getLocation({
                success: res => {
                    // console.log("res...", res);
                    this.latitude = res.latitude;
                    this.longitude = res.longitude;
                }
            });
        }
    }
}
</script>

<style lang="scss">
.wrap, map {
  width: 100%;
  height: 100%;

}
.wrap{
    position: relative;
}
cover-view{
    position: absolute;
    bottom: 70rpx;
    left: 30rpx;
    z-index: 1000;
    .location{
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
    }
}
</style>