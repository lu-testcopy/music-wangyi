import request from '../until/request'
// 用户登录的接口函数
export const login = (params) => {
  return request ({
    method: 'GET',
    url: '/login/cellphone',
    params
  })
}