<template>
  <div class="comment-container">
    <!-- 精彩评论区域 -->
    <h3 v-if="hotComment.length!==0?true:false">精彩评论</h3>
    <div class="top-comment">
      <div class="comment-item" v-for="(item, index) in hotComment" :key="index">
        <div class="pic">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="comment">
          <div class="content">
            <span class="nick-name">{{item.user.nickname}}: </span>
            <span>{{item.content}}</span>
          </div>
          <div class="replay" v-if="item.beReplied[0]">
            <span class="nick-name">@{{item.beReplied[0].user.nickname}}: </span>
            <span>{{item.beReplied[0].content}}</span>
          </div>
          <div class="character">
            <div class="timer">
              {{item.time}}
            </div>
            <div class="operation">
              <div>
                <i 
                  class="iconfont icon-tuijian" 
                  :class="{'is-active': item.liked}"
                  @click="giveLike(item.commentId, item.liked)"
                >
                </i>
                <span class="like-count">{{item.likedCount}}</span>
              </div> 
              <div>
                <i class="iconfont icon-fenxiang"></i>
              </div> 
              <div>
                <i class="iconfont icon-xinxi" @click="giveComment(item.user.nickname, item.commentId)"></i>
              </div> 
            </div>
          </div>
        </div>
      </div> 
    </div>
    <h3>最新评论</h3>
    <div class="comment-item" v-for="(item, index) in commentList" :key="index">
        <div class="pic">
          <img :src="item.user.avatarUrl" alt="">
        </div>
        <div class="comment">
          <div class="content">
            <span class="nick-name">{{item.user.nickname}}: </span>
            <span>{{item.content}}</span>
          </div>
          <div class="replay" v-if="item.beReplied[0]">
            <span class="nick-name">@{{item.beReplied[0].user.nickname}}: </span>
            <span>{{item.beReplied[0].content}}</span>
          </div>
          <div class="character">
            <div class="timer">
              {{item.time}}
            </div>
            <div class="operation">
              <div>
                <i class="iconfont icon-tuijian" @click="giveLike(item.commentId, item.liked)"></i> 
                <span class="like-count">{{item.likedCount}}</span>
              </div> 
              <div>
                <i class="iconfont icon-fenxiang"></i>
              </div> 
              <div>
                <i class="iconfont icon-xinxi" @click="giveComment(item.user.nickname, item.commentId)"></i>
              </div> 
            </div>
          </div>
        </div>
    </div> 
    <!-- 分页区域 -->
    <el-pagination
     background
     layout="prev, pager, next"
     :page-size="limit"
     @current-change="handleCurrentChange"
     :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { mvComment } from '@/api/mv.js'
import { commentLiked } from '@/api/like.js'
export default {
  name: 'VideoComment',
  props: {
    mvid: {
      require: true,
      default: ''
    }
  },
  created() {
    this.getMvComment(this.mvid, this.limit)    
  },
  data() {
    return {
      hotComment: [],
      commentList: [],
      limit: 20,
      total: 0,
    }
  },
  methods: {
    async getMvComment (id, limit, offset) {
      const cookie = window.localStorage.getItem('cookie')
      const { data } = await mvComment({id: id, limit: limit, offset: offset, cookie: cookie})
      console.log(data);
    //   精彩的评论
      if(data.hotComments) {
        this.hotComment = data.hotComments
      } else {
         this.hotComment = []
      }
      
      this.commentList = data.comments
      this.total = data.total
    },
    handleCurrentChange(pagenum) {
      const offset = (pagenum - 1) * this.limit
      this.getMvComment(this.mvid, this.limit, offset)
    },
    // 给评论点赞执行的函数
    async giveLike(id, liked) {
      // 对liked进行判断，如果时true就执行取消点赞的操作，如果为false就执行点赞的操作
      const cookie = window.localStorage.getItem('cookie')
       var timestamp=new Date().getTime()
      if(liked) {
        const { data } = await commentLiked({id: this.mvid, cid: id, t:0, type: 1, cookie: cookie, timestamp:timestamp})
        console.log('取消点赞');
        console.log(data);
      } else {
         const { data } = await commentLiked({id: this.mvid, cid: id, t:1, type: 1, cookie: cookie, timestamp:timestamp})
         console.log('点赞');
         console.log(data);
      }
    },
    // 给评论回复执行的函数
    giveComment(nickname, commentId) {
      console.log(nickname);
      //要将nickname传递给父组件
      this.$emit('replay', {name:nickname, id:commentId})
    }
  },
}
</script>
<style lang="less" scoped>
  .comment-container {
    margin-top: 15px;
    width: 100%;
    h3 {
      margin-top: 15px;
    }
    .comment-item {
      display: flex;
      margin-top: 15px;
      padding-bottom: 15px;
      width: 100%;
      font-size: 12px;
      border-bottom: 1px solid #ccc;
      .pic {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
      .comment {
        width: 100%;
        .content {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          .nick-name {
            color: #5a8ab9;
          }
        }
        .replay {
          margin-top: 5px;
          padding: 10px 5px;
          background-color: #ddd;
          border-radius: 5px;
          .nick-name {
            color: #5a8ab9;
          }
        }
        .character {
          width: 100%;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          color: rgb(172, 172, 172);
          .operation {
            display: flex;
            div {
              margin-left: 15px;
              .iconfont {
                font-size: 12px;
                cursor: pointer;
              }
              .like-count {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
    .el-pagination {
      margin-top: 15px;
    }
    .is-active {
      color: red;
    }
  }
</style>