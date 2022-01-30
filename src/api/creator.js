import request from '../until/request'

// 获取歌单创建者的详细信息
export const creatorInfo = (uid) => {
  return request ({
    method: 'GET',
    url: '/user/detail',
    params: {
      uid
    }
  })
}

// 获取用户的歌单接口函数
export const userSong = (uid) => {
  return request ({
    method: 'GET',
    url: '/user/playlist',
    params: {
      uid
    }
  })
}