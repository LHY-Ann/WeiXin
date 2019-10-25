<template>
    <form report-submit="true" @submit="formSubmit" class="box">
        <p>面试信息</p>
        <ul>
            <li>
                <span>公司名称</span>
                <input :value="company" auto-focus placeholder="请输入公司名称" @change="companyName"/>
            </li>
             <li>
                <span>公司电话</span>
                <input :value="phone" auto-focus placeholder="请输入面试联系人电话" @change="mobile"/>
            </li>
             <li>
                <span>面试时间</span>
                <picker
                    class="picker"
                    mode="multiSelector"
                    :range="dateRange"
                    :value="multiIndex"
                    @change="bindDateChange"
                ><view class="date">{{dateShow}}</view>
                </picker>
            </li>
             <li>
                <span>面试地址</span>
                <input @click="address" placeholder="请选择面试地址" v-model="site"/>
            </li>
        </ul>
        <p>备注信息</p>
        <div class="text">
            <textarea :value="description" @blur="remark" placeholder="备注信息（可选，100个字以内）" maxlength="100" auto-focus></textarea>
        </div>
        <button formType="submit">确定</button>
    </form>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    const moment = require('moment');
    const range = [
        [0,1,2,3,4,5,6,7,8,9],
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        ['00分','10分','20分','30分','40分','50分']
    ];
    export default {
        data() {
            return {
                formInline:{
                    'company':'',
                    'phone':'',
                    'form_id':'',
                    'address':'',
                    'latitude':'',	
                    'longitude':'',
                    'start_time':'',
                    'description':'',
                },
                multiIndex:[0,0,0],
            }
        },
        created(){
            // 如果当前时间是十一点之后，过滤掉今天
            if (moment().hour() == 23){
                this.multiIndex = [1,0,0];
            }
        },
        computed: {
            ...mapState('interview',['site','lat','lng','result','company','phone','description']),
            // 处理面试日期
            dateRange(){
                let dateRange = [...range];
                // 如果时间是今天，过滤掉现在之前的小时
                if (!this.multiIndex[0]){
                    dateRange[1] = dateRange[1].filter(item=>{
                    return item>moment().hour();
                    })
                }else{
                    dateRange[1] = range[1]
                }
                // 格式化小时
                dateRange[1] = dateRange[1].map(item=>{
                    return item+'点'
                })
                // 计算当前日期之后的十天
                dateRange[0] = dateRange[0].map(item=>{
                    return moment().add(item, 'days').date()+'号'
                })
                return dateRange;
            },
            // 显示的日期
            dateShow(){
                return moment()
                .add(moment().hour()==23?this.multiIndex[0]-1:this.multiIndex[0], 'd')
                .add(this.multiIndex[1]+1, 'h')
                .minute(this.multiIndex[2]*10)
                .format('YYYY-MM-DD HH:mm');
            }
        },
        methods: {
            ...mapMutations('interview',['setCompany','setPhone','setDescription']),
            ...mapActions('interview',['appendInterview']),
            formSubmit(e){
                if(this.company&&this.phone&&this.description&&this.site){
                    this.formInline.company=this.company
                    this.formInline.phone=this.phone
                    this.formInline.description=this.description
                    this.formInline.address=JSON.stringify({address:this.site}) 
                }else{
                    wx.showToast({
                        title: '请输入内容',
                        icon: 'none',
                        duration: 2000
                    })
                }
               
                this.formInline.latitude=this.lat
                this.formInline.longitude=this.lng
                this.formInline.form_id=e.detail.formId
                this.formInline.start_time=moment(this.dateShow).unix()*1000
                this.appendInterview(this.formInline)
            },
            companyName(e){
                this.setCompany(e.detail.value)
            },
            mobile(e){
                this.setPhone(e.detail.value)
            },
            remark(e){
                this.setDescription(e.detail.value)
            },
            // 监听多列选择器每列变化
            bindDateChange(e) {
                // console.log('picker发送选择改变，携带值为', e.detail.value)
                this.multiIndex=e.detail.value
            },
            address(){
                wx.navigateTo({ url: '/pages/interview/map' });
            }
        },
        watch: {
            result(result){
                if(result.code===0){
                    wx.navigateTo({ url: '/pages/interview/list' });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .box{
        width: 100%;
        height: 100%;
        font-size: 14px;
    }
    p{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding-left: 20px;
        background-color: #eeeeee;
    }
    ul{
        padding: 0 20px;
        li{
            display: flex;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            span{
                width: 20%;
                display: inline-block;
            }
            input,.picker{
                flex: 1;
                padding-top: 9px;
                font-size: 14px;
                padding-left: 10px;
            }
        }
    }
    .text{
        padding:20px;
        textarea{
            width: 90%;
            height: 100px;
            font-size: 14px;
            padding: 10px;
            border: 1px solid #ccc;
        }
    }
    button{
        color: #fff;
        background-color: #999;
    }
</style>