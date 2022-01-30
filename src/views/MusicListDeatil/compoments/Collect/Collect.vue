<template>
    <div class="collect-container">
     <div class="collect-area">
        <div class="collect-item" 
          v-for="(item, index) in collectorList" 
          :key="item.userId"
          ref="itemRef"
        >
          <div class="pic">
            <img :src="item.backgroundUrl" alt="">
          </div>
          <div class="text">
            <p class="name">{{item.nickname}}</p>
            <p class="introduce">{{item.signature}}</p>
          </div>
        </div> 
     </div>
     <el-pagination
      background
      layout="prev, pager, next"
      :page-size="limit"
      :total="total">
     </el-pagination>
    </div>
</template>
<script>
import {collector} from '@/api/song.js'
export default {
  name: 'Collect',
  props: {
   songId: {
     require: true,
     default: ''
   }
  },
  mounted() {
   
  },
  data() {
    return {
      collectorList: [],
      avtorIndex: 0,
      limit: 30,
      total: 0, 
    }
  },
  watch: {
    songId: {
      async handler(newName){
        // console.log(newName); 
        this.getCollectors(newName,this.limit)
      },
      deep: true,
      immediate: true 
    },
  },
  methods: {
    async getCollectors(id, limit, offset) {
      const { data } = await collector({id: id, limit: limit, offset:offset})
        console.log(data);
        this.collectorList = data.subscribers
        this.total = data.total
    }
  }, 
}
</script>
<style lang="less" scoped>
  .collect-container {
    padding: 0 40px;
    .collect-area {
      display: flex;
      flex-wrap: wrap;
      .collect-item {
        display: flex;
        margin-top: 5px;
        margin-left: 20px;
        padding: 10px 10px;
        box-sizing: border-box;
        width: 350px;
        height: 100px;
        cursor: pointer;
        border-radius: 10px;
        .pic {
          img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
        }
        .text {
          margin-left: 10px;
          padding-top: 5px;
          box-sizing: border-box;
          .name {
            font-size: 13px;
          }
          .introduce {
            font-size: 12px;
            color: #ccc;
          }
        }
      } 
      .collect-item:hover {
        background: #ddd;
      }
    }
    .el-pagination {
      position: relative;
      left: 20px;
      margin-top: 10px;
    }
  }
</style>