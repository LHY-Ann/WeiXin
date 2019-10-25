import request from '../util/request';

// 添加面试
export function addInterview(params){
    return request.post('/sign', params)
}

// 获取面试列表
export function getInterview(params){
    return request.get('/sign',params)
}

// 获取面试详情
export function getInterviewDetail(params){
    return request.get(`/sign/${params.id}`)
}

// 更改面试
export function updateInterview(params){
    return request.put(`/sign/${params.id}`,{
        remind:params.remind,
        status:params.status
    })
}