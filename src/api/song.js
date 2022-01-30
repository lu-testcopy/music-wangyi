import request from '../until/request'
// 根据歌单的Id查询歌单的详细信息
export const songDetail = (id, timestamp) => {
  return request ({
    method: 'GET',
    url: '/playlist/detail',
    params: {
      id,
      timestamp,
      cookie: window.localStorage.getItem('cookie')?encodeURIComponent(window.localStorage.getItem('cookie')):null
    }
  })
}
// 请求登录之后，获取其余的歌曲的接口函数
export const otherMusics = (ids) => {
  return request ({
    method: 'GET',
    url: '/song/detail',
    params: {
      ids
    }
  })
}
// 获取歌单的评论的接口函数
export const comments = (params) => {
  return request ({
    method: 'GET',
    url: '/comment/playlist',
    params
  })
}
// 获取歌单的收藏者的接口函数
export const collector = (params) => {
  return request ({
    method: 'GET',
    url: '/playlist/subscribers',
    params
  })
}