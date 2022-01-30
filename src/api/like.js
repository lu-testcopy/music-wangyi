import request from '../until/request'
// 评论点赞的接口函数
export const  commentLiked = (params) => {
  return request ({
    method: 'GET',
    url: '/comment/like',
    params
  })
}