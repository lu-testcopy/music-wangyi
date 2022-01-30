import request from '../until/request'

// 发送评论的接口函数
export const handleComment = (params) => {
  return request ({
    method: 'GET',
    url: '/comment',
    params
  })
}