import request from '../until/request'
// 获取专辑内容的接口函数
export const albumInfo = (id) => {
  return request ({
    method: 'GET',
    url: '/album',
    params: {
      id
    }
  })
}