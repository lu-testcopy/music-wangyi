<template>
  <div class="comments-container">
    <!-- 头部评论区域 -->
    <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入评论内容"
        maxlength="140"
        show-word-limit
        v-model="commentarea"
    >
    </el-input>
    <el-button round size="mini" class="conment-btn">评论</el-button>
    <!-- 展示的评论区域 -->
    <!-- 精彩评论区域 -->
    <div class="comments-area">
      <h5 v-if="hotComments.length!==0?true:false">精彩评论</h5>
      <div class="commentItem" v-for="(item, index) in hotComments" :key="item.commentId">
        <!-- 头像区域 -->
        <div class="avtor">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <!-- 内容区域 -->
        <div class="content">
          <!-- 头部的评论具体信息 -->
          <div class="content-info">
            <span class="nick-name">{{item.user.nickname}}:</span> 
            <span>{{item.content}}</span>
          </div>
          <!-- 对评论的具体回复 -->
          <div class="reply-comment" v-if="item.beReplied.length>0?true:false">
            <div class="avtor">
              <span class="nick-name">@{{item.beReplied[0].user.nickname}}:</span>
              <span>{{item.beReplied[0].content}}</span>
            </div>
          </div>
          <!-- 评论的时间及一些操作 -->
          <div class="content-character">
              <!-- 时间区域 -->
            <span>{{item.time}}</span>
            <!-- 图标区域 -->
            <div class="content-icon">
              <i class="iconfont icon-tuijian">{{item.likedCount}}</i>
              <i class="iconfont icon-fenxiang"></i>
              <i class="iconfont icon-xinxi"></i>
            </div>
          </div>
        </div>
      </div>
      <h5 class="hot-title">热门评论</h5>
       <div class="commentItem" v-for="(item, index) in commentList" :key="item.commentId">
        <!-- 头像区域 -->
        <div class="avtor">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <!-- 内容区域 -->
        <div class="content">
          <!-- 头部的评论具体信息 -->
          <div class="content-info">
            <span class="nick-name">{{item.user.nickname}}:</span> 
            <span>{{item.content}}</span>
          </div>
          <!-- 对评论的具体回复 -->
          <div class="reply-comment" v-if="item.beReplied.length>0?true:false">
            <div class="avtor">
              <span class="nick-name">@{{item.beReplied[0].user.nickname}}:</span>
              <span>{{item.beReplied[0].content}}</span>
            </div>
          </div>
          <!-- 评论的时间及一些操作 -->
          <div class="content-character">
              <!-- 时间区域 -->
            <span>{{item.time}}</span>
            <!-- 图标区域 -->
            <div class="content-icon">
              <i class="iconfont icon-tuijian">{{item.likedCount}}</i>
              <i class="iconfont icon-fenxiang"></i>
              <i class="iconfont icon-xinxi"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange" 
      :current-page="currentPage" 
      :page-size="limit"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { comments } from '@/api/song.js'
export default {
  name: 'Comments',
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
      commentList: [],
      hotComments: [],
      commentarea: '',
      currentPage: 1,
      limit: 20,
      total: 0
    }
  },
  watch: {
    // 当传过来的songId发生变化，发起网络请求，获取评论数据
    songId: {
      async handler(newName) {
        // console.log(newName);
        // const { data } = await comments(newName)
        // console.log(data);
        // this.commentList = data.comments
        // this.hotComments = data.hotComments
        // this.total = data.total
        this.getCommentList(newName, this.limit)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    //发起网络请求执行的函数
    async getCommentList(songId , limit, offset) {
      const { data } = await comments({id: songId, limit: limit, offset: offset})
      // console.log(data);
      this.commentList = data.comments
      if(data.hotComments) {
        this.hotComments = data.hotComments
      } else {
        this.hotComments = []
      }
      this.total = data.total
    },
    // 点击页码执行的函数
    handleCurrentChange(pageNumber) {
      this.currentPage = pageNumber
      console.log(pageNumber);
      if(pageNumber === 1) {
        this.getCommentList(this.songId, this.limit)  
      } else {
        this.getCommentList(this.songId, this.limit, pageNumber*20-20)
      }
      this.$emit('onScroll')
    },
  },
}
</script>
<style lang="less" scoped>
  .comments-container {
    .conment-btn {
      position: relative;
      left: 100%;
      transform: translateX(-56px);
      margin: 10px 0;
    }
    .comments-area {
      .commentItem {
        display: flex;
        margin-top: 10px;
        border-bottom: 1px solid #ccc;
        padding: 12px 0;
        .avtor {
          flex: 1;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .content {
          flex: 38;
          margin-left: 10px;
          font-size: 12px;
          .content-info {
            .nick-name {
              color: #5a8ab9;
              cursor: pointer;
            }
            margin-bottom: 5px;
          }
          .reply-comment {
            padding: 8px 5px;
            margin-top: 5px;
            background: #ddd;
            border-radius: 5px;
            .nick-name {
              color: #5a8ab9;
              cursor: pointer;
            }
          }
          .content-character {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            color: rgb(172, 172, 172);
            .content-icon {
              .iconfont {
                font-size: 12px;
                margin-left: 12px;
              }
            }
          }
        }
      }
      .hot-title {
        margin-top: 15px;
      }
    }
    .el-pagination {
      margin-top: 10px;
    }
  }
</style>