import request from '../until/request'
// 获取轮播图的api接口
export const getBanners = () => {
  return request ({
    method: 'GET',
    url: '/banner'
  })
}
// 获取推荐歌单的接口函数
export const recomendSongList = () => {
  return request ({
    method: 'GET',
    url: 'personalized',
    params: {
      limit: 20
    }
  })
}
// 获取头部推荐歌单的接口函数
export const topSong = () => {
  return request ({
    method: 'GET',
    url: '/top/playlist',
    params: {
      limit: 1
    }
  })
}
// 获取显示的歌单分类接口函数
export const showSong = () => {
  return request ({
    method: 'GET',
    url: '/playlist/hot'
  })
}
// 获取隐藏的歌单分类接口函数
export const allSong = () => {
  return request ({
    method: 'GET',
    url: '/playlist/catlist'
  })
}
// 通过歌单的分类去获取与之对应的歌单
export const songsList = (cat) => {
  return request ({
    method: 'GET',
    url: '/top/playlist',
    params: {
      cat
    }
  })
}