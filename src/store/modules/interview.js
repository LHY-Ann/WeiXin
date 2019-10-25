import { addInterview, getInterview, getInterviewDetail, updateInterview } from '../../service'
const moment = require('moment');

const state = {
    site:'',
    lat:0,
    lng:0,
    result:{},
    signList:[],
    detailData:{},
    company:'',
    phone:'',
    description:'',
};

const mutations = {
    setAddress(state,payload){
        state.site=payload.address
        state.lat=payload.location.lat
        state.lng=payload.location.lng
    },
    setSign(state,payload){
        state.result=payload.data
    },
    setCompany(state,payload){
        state.company=payload
    },
    setPhone(state,payload){
        state.phone=payload
    },
    setDescription(state,payload){
        state.description=payload
    },
    // 处理获取到的地址和时间戳
    setList(state,payload){
        // 对address进行处理
        payload.data.map(item=>{
            if(/^([\u4E00-\u9FA5])*$/.test((item.address).slice(0,1))){
                item.address=item.address  
                // console.log(item.address,1111111111111)
            }else if(/^\{$/g.test((item.address).slice(0,1))){
                item.address=JSON.parse(item.address).address
                // console.log(item.address,222222222222)
            }else if(/^\"$/.test((item.address).slice(0,1))){
                item.address=JSON.parse(item.address)
                // console.log(item.address,3333333333)
            }
            return item
        })
        // 转时间
        payload.data.map(item=>{
            return item.start_time = moment(Number(item.start_time)).format('YYYY-MM-DD HH:mm:ss')
        })

        // 如果page>1这是上拉加载，否则下拉刷新
        if(payload.page>1){
            // 判断是否是空数组
            if(payload.data.length!=0){
                state.signList=state.signList.concat(payload.data)
            }else{
                wx.showToast({
                    title: '没有更多数据了！',
                    icon: 'none',
                    duration: 2000
                })
            }
        }else{
            if(payload.data.length==0){
                wx.showToast({
                    title: '没有更多数据了！',
                    icon: 'none',
                    duration: 2000
                })
            }
            state.signList=payload.data
        }
            
            
       
    },
    setDetail(state,payload){
        if(/^([\u4E00-\u9FA5])*$/.test((payload.address).slice(0,1))){
            payload.address=payload.address  
        }else if(/^\{$/g.test((payload.address).slice(0,1))){
            payload.address=JSON.parse(payload.address).address
        }else if(/^\"$/.test((payload.address).slice(0,1))){
            payload.address=JSON.parse(payload.address)
        }
        state.detailData=payload
    }
};

const actions = {
    // 添加面试接口
    async appendInterview({commit}, params){
        let data = await addInterview(params);
        commit('setSign',data)
    },

    // 获取面试列表数据
    async getList({commit},params){
        let { status, page } = params
        let data=null
        if(status===2){
            data = await getInterview();
        }else{
            data = await getInterview({ status, page });
        }
        commit('setList',{data,page})
    },

    // 获取跳详情数据
    async getDetail({commit},params){
        let data = await getInterviewDetail(params);
        commit('setDetail',data)
    },

    // 更改面试信息
    async updateList({commit},params){
        let data = await updateInterview(params)
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}


