<template>
  <div class="relate-container">
    <div class="video-item" 
      v-for="(item, index) in relateMVlist" 
      :key="index"
      @click="$router.push({name: 'videoDeatil', params: {id: item.vid}})"
    >
      <div class="pic">
        <img :src="item.coverUrl" alt="">
      </div>
      <div class="content">
        <span class="title">{{item.title}}</span>
        <span class="name">by {{item.creator[0].userName}}</span>
      </div>
    </div>   
  </div>
</template>
<script>
import { relateMV } from '@/api/mv.js'
export default {
  name: 'RelateVideo',
  props: {
    mvid: {
      require: true,
      default: ''
    }
  },
  created() {
    this.getRelateMV()   
  },
  data() {
    return {
      relateMVlist: []    
    }
  },
  methods: {
    async getRelateMV() {
      const { data } = await relateMV(this.mvid)
      console.log(data);
      this.relateMVlist = data.data
    }
  },    
}
</script>
<style lang="less" scoped>
  .relate-container {
    .video-item {
      display: flex;
      margin-bottom: 10px;
      cursor: pointer;
      .pic {
        width: 150px;
        height: 90px;
        img {
          width: 150px;
          height: 90px;
          border-radius: 10px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 12px;
        margin-left: 10px;
        padding: 10px 0;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .name {
          color: rgb(156, 156, 156);
        }
      }
    }
  }
</style>