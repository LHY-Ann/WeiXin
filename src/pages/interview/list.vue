<template>
    <div class="wrap">
        <ul>
            <li v-for="item in list" :key="item.id" @click="activeChange(item.id)" :class="{active:index===item.id}">{{item.title}}</li>
        </ul>
        <div class="content">
        <!-- <scroll-view class="content" scroll-y="true">  -->
            <div class="item" v-for="groud in signList" :key="groud.id" @click="itemClick(groud.id)">
                <h3>{{groud.company}}</h3>
                <p>{{groud.address}}</p>
                <div>
                    <text>面试时间：{{groud.start_time}}</text>
                    <text>{{groud.remind===-1?'未提醒':'已提醒'}}</text>
                </div>
            </div>
        <!-- </scroll-view> -->
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        data() {
            return {
                list:[{
                    id:-1,
                    title:'未开始'
                },{
                    id:0,
                    title:'已打卡'
                },{
                    id:1,
                    title:'已放弃'
                },{
                    id:2,
                    title:'全部'
                }],
                index:-1,
                page:1,
            }
        },
        created() {
            this.getList({
                status:this.index,
                page:1
            })
        },
        computed: {
            ...mapState('interview',['signList'])
        },
        methods: {
            ...mapActions('interview',['getList']),
            // tab切换
            activeChange(id){
                this.index=id
                this.getList({status:id,page:1})
            },
            // 跳详情
            itemClick(id){
                 wx.navigateTo({ url: '/pages/interview/detail?id='+ id });
            }
        },
        // 下拉刷新
        onPullDownRefresh(){
            console.log('触发下拉刷新');
            setTimeout(() => {
                this.getList({status:this.index,page:1})
                wx.stopPullDownRefresh();
                console.log('结束上拉')
            }, 1000);
        },
        // 上拉加载
        onReachBottom(){
            this.page=this.page+1
            this.getList({status:this.index,page:this.page})
            console.log('触发上拉加载...');
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
    }
    ul{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 40px;
        display: flex;
        background-color: #fff;
        li{
            flex: 1;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            text-align: center;
        }
        .active{
            color: blue;
            border-bottom: 1px solid blue;
        }
    }
    .content{
        width: 100%;
        // height: 89%;
        margin-top: 50px;
        // overflow: hidden;
        background-color: #fff;
        .item{
            height: 100px;
            padding: 10px;
            border-bottom: 1rpx solid #ccc;
            h3{
                font-size: 16px;
                font-weight: bolder;
                margin-bottom: 10px;
            }
            p{
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 13px;
                color: #ccc;
                margin-bottom: 10px;
            }
            div{
                display: flex;
                font-size: 13px;
                text:nth-of-type(1){
                    flex: 8;
                }
                text:nth-of-type(2){
                    flex: 2;
                    text-align: center;
                    background-color: tomato;
                    color: #fff;
                }
            }
        }
    }
</style>