import request from '../until/request'
// 获取所有榜单的接口函数
export const topList = () => {
    return request({
      method: 'GET',
      url: '/toplist'
    })
}
// 获取单个榜单排行榜的详情
export const rankingList = (id) => {
  return request ({
    method: 'GET',
    url: 'playlist/detail',
    params: {
      id
    }
  })
}