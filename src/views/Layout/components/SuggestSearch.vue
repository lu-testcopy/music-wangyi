<template>
    <div class="suggest-container">
      <p class="title">搜索建议</p>  
      <div class="show-content" v-if="suggestion.order">
        <!-- 单曲展示的页面 -->
        <div class="song">
        <div class="classify">
          <i class="iconfont icon-yinle"></i>
          <span>单曲</span>
        </div>
        <div class="song-item" v-for="(item ,index) in suggestion.songs" :key="index">
           {{item.name}}-{{item.artists[0].name}}
        </div>
        </div>
        <!-- 展示的歌手 -->
        <div class="singer">
        <div class="classify">
          <i class="iconfont icon-yuyin"></i>
          <span>歌手</span>
        </div>  
        <div class="song-item" v-for="(item ,index) in suggestion.artists" :key="index">
           {{item.name}}
        </div>
        </div>
        <!-- 展示的专辑 -->
        <div class="album">
        <div class="classify">
          <i class="iconfont icon-xinxi"></i>
          <span>专辑</span>
        </div>  
        <div class="song-item" v-for="(item ,index) in suggestion.albums" :key="index">
           {{item.name}}
        </div> 
        </div>
        <!-- 展示的歌单 -->
        <div class="songs">
        <div class="classify">
          <i class="iconfont icon-yuyin"></i>
          <span>歌单</span>
        </div>  
        <div class="song-item" v-for="(item ,index) in suggestion.playlists" :key="index">
           {{item.name}}
        </div>  
        </div>
      </div>
       <div class="no-show" v-else>没有更多了</div>
    </div>
</template>
<script>
import { debounce } from 'lodash'
import { suggesSearch } from '@/api/search.js'
export default {
  name: 'SuggestSearch',
  props: {
    searchValue: {
      require: true,
      default: ''
    }
  },
  data() {
    return {
      suggestion: null 
    }
  },
  watch: {
    // 监听searchValue的改变
    searchValue: {
      handler: debounce(async function(newName, oldName) {
       const  {data} = await suggesSearch({keywords: newName})
       console.log(data);
       this.suggestion = data.result
      },500),
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
  .suggest-container {
    font-size: 10px;
    .title {
      margin-bottom: 10px;
      margin-left: 20px;
    }
    .show-content{
      height: 300px;
      overflow-y: auto;
      .classify {
        background-color: blanchedalmond;
        .iconfont {
          margin-right: 5px;
        }
      }
      .song-item {
        padding: 5px 20px;
        cursor: pointer;
      }
    }
    .no-show {
      margin-left: 20px;
    }
  }
</style>