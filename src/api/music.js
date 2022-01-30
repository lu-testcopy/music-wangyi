import request from '../until/request'

// 获取音乐url的接口函数
export const musicUrl = (params) => {
  return request ({
    method: 'GET',
    url: '/song/url',
    params
  })
}

// 获取音乐歌词的接口函数
export const lyric = (params) => {
  return request ({
    method: 'GET',
    url: '/lyric',
    params
  })
}