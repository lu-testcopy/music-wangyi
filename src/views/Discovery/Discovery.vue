<template>
    <div class="discover-container">
      <div class="nav-bar">
        <div class="nav-item">
          <router-link 
            :to="{path: '/discovery/individuality'}" 
            :class="{active: $route.path === '/discovery/individuality'}"
          >
          个性推荐
          </router-link>
        </div>
        <div class="nav-item">
          <router-link 
            :to="{path:'/discovery/musiclistindex'}" 
            :class="{active: $route.path === '/discovery/musiclistindex'}"
          >
            歌单
          </router-link>
        </div>
        <div class="nav-item">
          <router-link  
             :to="{path:'/discovery/ranking'}" 
             :class="{active: $route.path === '/discovery/ranking'}"
          >
            排行榜
          </router-link>
        </div>
        <div class="nav-item">
          <router-link  
            :to="{path:'/discovery/singer'}" 
            :class="{active: $route.path === '/discovery/singer'}"
          >
            歌手
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: 'Recommend',
}
</script>
<style lang="less" scoped>
   .discover-container{
     .nav-bar {
       position: fixed;
       top: 50px;
       left: 200px;
       width: 100%;
       height: 40px;
       display: flex;
       margin-bottom: 20px;
       z-index: 999;
       background-color: #fff;
       padding-top: 8px;
       .nav-item {
       height: 30px;
       line-height: 30px;
       margin-left: 20px;
       .router-link-active{
         text-decoration: none;
         color: black
        }
       a {
        text-decoration: none;
        color: black
        }
      }
     }
     .active {
       font-size: 20px;
       font-weight: 700;
       padding-bottom: 5px;
       border-bottom: 3px #eb2d1f solid;
     }
    } 
</style>