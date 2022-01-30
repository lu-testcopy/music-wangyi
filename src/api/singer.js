import request from '../until/request'
// 获取歌手列表的接口函数
export const singerList = (params) => {
  return request ({
    method: 'GET',
    url: '/artist/list',
    params
  })
}
//获取歌手的信息
export const singerInfo = (id) => {
  return request ({
    method: 'GET',
    url: '/artist/detail',
    params: {
      id
    }
  })
}
// 获取歌手热门50首歌曲
export const hotMusics = (id) => {
  return request ({
    method: 'GET',
    url: '/artist/top/song',
    params: {
      id
    }
  })
}
// 获取歌手专辑的接口函数
export const albums = (id) => {
  return request ({
    method: 'GET',
    url: '/artist/album',
    params: {
      id
    }
  })
}
// 获取歌手mv的接口函数
export const singerMv = ( params ) => {
  return request ({
    method: 'GET',
    url: '/artist/mv',
    params
  })
}