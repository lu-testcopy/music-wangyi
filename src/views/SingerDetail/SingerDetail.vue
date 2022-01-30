<template>
  <div class="singer-detail-container">
    <!-- 歌手详情信息页面 -->
    <div class="singer-info">
      <!-- 头像区域 -->
      <div class="pic">
        <img :src="authorInfo.cover" alt="">
      </div>
      <!-- 歌手其他信息 -->
      <div class="singer-character">
        <h4>{{authorInfo.name}}</h4>
        <!-- 按钮区域 -->
        <div class="btn">
          <el-button round>收藏</el-button>
          <el-button round>个人主页</el-button>
        </div>
        <!-- 描述区域 -->
        <div class="description">
          <span>单曲数: {{authorInfo.musicSize}}</span>
          <span>专辑数: {{authorInfo.albumSize}}</span>
          <span>MV数: {{authorInfo.mvSize}}</span>
        </div>
      </div>
    </div>
    <!-- tab栏区域 -->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="专辑" name="first">
        <album :singerId="singerId"></album>
      </el-tab-pane>
      <el-tab-pane label="mv" name="second">
        <music-video :singerId="singerId" v-if="activeName==='second'"></music-video>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { singerInfo } from '@/api/singer.js'
const Album = () => import('./components/Album.vue')
const MusicVideo = () => import('./components/MusicVideo.vue')
export default {
  name: 'SingerDetail',
  created() {
    this.getSingInfo()
  },
  components: {
    Album,
    MusicVideo
  },
  data() {
    return {
      authorInfo: {},
      activeName: 'first'
    }
  },
  computed: {
    singerId() {
      return this.$route.params.id
    }
  },

  methods: {
    // 获取歌手信息执行的函数
    async getSingInfo() {
      const { data } = await singerInfo(this.singerId)
      console.log(data);
      this.authorInfo = data.data.artist
    },
    handleClick() {

    }
  }, 
}
</script>
<style lang="less" scoped>
  .singer-detail-container {
    padding: 0 20px;
    .singer-info {
      display: flex;
     align-items: center;
      width: 100%;
      height: 200px;
      .pic {
        width: 150px;
        height: 150px;
        img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
        }
      }
      .singer-character {
        margin-left: 20px;
        height: 150px;
        .btn {
          margin: 10px 0;
          .el-button {
            padding: 8px 18px;
            font-size: 12px;
          }
        }
        .description {
          margin-left: 15px;
          font-size: 12px;
        }
      }
    }
    .tabs {
      .el-tabs__item {
        font-size: 12px;
      }
      /deep/.el-tabs__nav-wrap::after {
        width: 0;
        height: 0;
      }
      /deep/.el-tabs__active-bar {
        background-color: #eb2d1f;
      }
      /deep/.is-active  {
        color: #eb2d1f;
        font-size: 14px;
      }
    }
  }
</style>