import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import ('@/views/Layout/Layout.vue')
const Discovery = () => import ('@/views/Discovery/Discovery.vue')
const Video = () => import ('@/views/Video/Video.vue')
const Collect = () => import ('@/views/Collect/Collect.vue')
const Recommend = () => import ('@/views/Recommend/Recommend.vue')
const Individuality = () => import ('@/views/Discovery/components/Individuality/Individuality.vue')
const MusicListIndex = () => import ('@/views/Discovery/components/MusicListIndex/MusicListIndex.vue')
const Ranking = () => import('@/views/Discovery/components/Ranking/Ranking.vue')
const Singer= () => import('@/views/Discovery/components/Singer/Singer.vue')
const MusicListDeatil = () => import('@/views/MusicListDeatil/MusicListDeatil.vue')
const SingerDetail = () => import ('@/views/SingerDetail/SingerDetail.vue')
const VideoDeatil = () => import('@/views/VideoDeatil/VideoDeatil.vue')
const Personnal = () => import('@/views/Personnal/Personnal.vue')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
   path: '/',
   name: 'layout',
   component: Layout,
   children: [
     {
       path: '/',
       redirect: '/discovery'
     },
     {
       path: '/discovery',
       name: 'discovery',
       component: Discovery,
       children: [
         {
          path: 'individuality',
          name: 'individuality',
          component: Individuality
         },
         {
           path: 'musiclistindex',
           name: 'musiclistindex',
           component: MusicListIndex
         },
         {
           path: 'ranking',
           name: 'ranking',
           component: Ranking
         },
         {
           path: 'singer',
           name: 'singer',
           component: Singer
         }
       ]
     },
     {
       path: '/video',
       name: 'video',
       component: Video
     },
     {
      path: '/collect',
      name: 'collect',
      component: Collect
     },
     {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
     },
     {
       path: '/musiclistdetail/:id',
       name: 'musiclistdetail',
       component: MusicListDeatil
     },
     {
       path: '/singerdetail/:id',
       name: 'singdetail',
       component: SingerDetail
     },
     {
       path: '/videoDeatil/:id',
       name: 'videoDeatil',
       component: VideoDeatil 
     },
     {
       path: '/personal/:id',
       name: 'personal',
       component: Personnal
     }
   ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
