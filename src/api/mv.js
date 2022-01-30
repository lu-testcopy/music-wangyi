import request from '../until/request'
// 获取mv的信息的接口函数
export const mvInfo = (mvid) => {
  return request ({
    method: 'GET',
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}
// 获取mv播放地址的接口函数
export const mvUrl = (id) => {
  return request ({
    method: 'GET',
    url: '/mv/url',
    params: {
      id
    }
  })
}
// 对mv点赞的执行函数
export const like = (params) => {
  return request ({
    method: 'GET',
    url: '/resource/like',
    params
  })
}
// 检查用户是否对指定的mv点赞的接口函数
export const isLike = (params) => {
  return request ({
    method: 'GET',
    url: '/playlist/mylike',
    params
  })
}
// 收藏mv的接口函数
export const collectMv = (params) => {
  return request ({
    method: 'GET',
    url: '/mv/sub',
    params
  })
}
// 检查用户收藏了的mv
export const collectedMv = (params) => {
  return request ({
    method: 'GET',
    url: '/mv/sublist',
    params
  })
}
// 获取mv评论的接口函数
export const mvComment = (params) => {
  return request ({
    method: 'GET',
    url: '/comment/mv',
    params
  })
}
// 相关mv推荐的接口函数
export const relateMV = (id) => {
  return request ({
    method: 'GET',
    url: '/related/allvideo',
    params: {
      id
    }
  })
}