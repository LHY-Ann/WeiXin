import request from '../util/request';

// 登陆接口
export function code2session(params){
    return request.post('/user/code2session', params)
}

// 生物认证
export function fingerVerify(params){
    return request.post('/user/fingerPrint', params);
}

// 获取手机号
export function getPhone(params){
    return request.post('/user/decrypt', params);
}