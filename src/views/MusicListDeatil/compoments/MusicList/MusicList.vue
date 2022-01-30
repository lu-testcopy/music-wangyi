<template>
    <div class="music-list">
      <el-table
         :data="musicList"
         style="width: 100%"
         stripe
         class="table-box"
         @row-dblclick="Musicplay"
       >
       <el-table-column
        type="index"
        width="50">
       </el-table-column>
       <el-table-column
        prop="name"
        label="音乐标题"
        width="280">
       </el-table-column>
       <el-table-column
        prop="ar[0].name"
        label="歌手"
        width="180">
       </el-table-column>
       <el-table-column
        prop="al.name"
        label="专辑">
       </el-table-column>
       <el-table-column
        prop="dt"
        label="时长"
        :formatter="fmtTime">
       </el-table-column>
      </el-table>  
    </div>
</template>
<script>
import dayjs from 'dayjs'
import pubsub from 'pubsub-js'
import { musicUrl } from '@/api/music.js'

export default {
  name: 'MusicList',
  props: {
    musicList: {
      require: true,
      default: [],
    }
  },
  data() {
    return {
      mIndex: 0    
    }
  },
  mounted() {
    pubsub.subscribe('nextPlay',() => {
      // 判断数组的索引
      if(this.mIndex >= (this.musicList.length -1)) {
        this.mIndex = 0
      } else {
        this.mIndex++
      }
      console.log(this.mIndex );
      this.publish()
    })
     pubsub.subscribe('previousPlay', () => {
      //  如果播放的是第一首歌曲，我们就要播放的是最后一首歌曲
      if(this.mIndex === 0) {
        this.mIndex = this.musicList.length - 1
      } else {
        this.mIndex--
      }
      this.publish()
     })
  },
  methods: {
    fmtTime(row, column, cellValue, index) {
      return dayjs(cellValue).format('mm:ss');
    },

    // 双击歌曲表单执行的函数
    async Musicplay(row, column, event) {
      console.log(row, column, event);
      // 我们根据歌曲的id获取得到歌曲的索引
      let mIndex = this.musicList.findIndex(item => {
        return item.id === row.id
      })
      this.mIndex  = mIndex 
      this.publish()
    },

    async publish() {
      // 发送网络请求，获取音乐的url地址
      const { data } = await musicUrl({id: this.musicList[this.mIndex].id})
      console.log(data);
      // 获取音乐的url
      const mUrl = data.data[0].url
      console.log(mUrl);
      // 音乐的图像
      const pic = this.musicList[this.mIndex].al.picUrl
      // 音乐的时长
      const dt = this.musicList[this.mIndex].dt
      // 音乐的名称
      const mName = this.musicList[this.mIndex].al.name
      // 音乐的id
      const id =  data.data[0].id
      let musicObj = {
        mUrl,
        pic,
        dt,
        mName,
        id
      }
      // 发布事件
      pubsub.publish('musicPlay', musicObj)    
    }
  },
}
</script>
<style lang="less" scoped>
  .music-list {
    .table-box {
      font-size: 12px;
      /deep/th {
       padding: 0 !important;
       height: 44px;
      }
      /deep/td {
       padding: 0 !important;  
       height: 28px; 
      }
    }
    
    // /deep/.el-table::before {
    //   height: 0;
    //   width: 0;
    // }
  }
</style>