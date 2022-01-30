<template>
    <div class="default-container">
      <p class="title">热搜榜</p>
      <div class="search-item" v-for="(item,index) in searchList" :key="index">
        <el-row>
          <el-col :span="2"><span :class="{'active':index>=3?false:true}">{{index+1}}</span></el-col>
          <el-col :span="22">
            <div class="search-value">
              <h6>{{item.searchWord}}</h6>
              <span class="content">{{item.content}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
import { defaultSearch } from '@/api/search.js'
export default {
  name: 'DefaultSearch',  
  created() {
    this.getDefaultSearchs() 
  },
  data() {
    return {
      searchList: []  
    }
  },
  methods: {
    async getDefaultSearchs() {
      const { data } = await defaultSearch()
      this.searchList = data.data
    }
  },
}
</script>
<style lang="less" scoped>
   .default-container {
     height: 300px;
     overflow-y: auto;
     .search-item {
       margin-top: 10px;
       cursor: pointer;
       padding: 0 12px;
       .el-row {
         display: flex;
         align-items: center;
         .search-value {
           .content {
             font-size: 10px;
           }
         }
       }
     }
     .search-item:hover {
       background-color: #ccc;
     }
   }
   .default-container::-webkit-scrollbar {display:none}
   .active {
    color: red;
   }
</style>