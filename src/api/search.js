import request from '../until/request'
// 默认热搜搜索的接口函数
export const defaultSearch = () => {
  return request ({
    method: 'GET',
    url: '/search/hot/detail'
  })
}
// 获取联想建议的接口函数
export const suggesSearch = (params) => {
  return request ({
    method: 'GET',
    url: '/search/suggest',
    params
  })
}