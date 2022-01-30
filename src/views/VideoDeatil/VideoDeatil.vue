<template>
    <div class="video-container" ref="videoRef">
      <!-- 左边的视频及视频信息还有评论的区域 -->
      <div class="left">
        <p>MV区域</p>
        <!-- 视频区域 -->
        <video :src="videoUrl" width="496px" height="284px" controls></video>
        <!-- 下面的作者区域 -->
        <div class="author-area">
          <!-- 作者名字区域 -->
          <div class="author">
            <div class="pic">
              <img :src="videoInfo.cover" alt="">
            </div>
            <span class="artist-name">{{videoInfo.artistName}}</span>
          </div>
          <h3>{{videoInfo.name}}</h3>
          <!-- mv的一些信息 -->
          <div class="character">
            <span>发布: {{videoInfo.publishTime}}</span>
            <span>播放: {{videoInfo.playCount/10000}}万</span>
          </div>
          <!-- 按钮区域 -->
          <div class="btns">
            <el-button round plain @click="giveLike">
              <i class="iconfont icon-tuijian" :class="{'like-active': isLike}"></i>
              <span v-if="isLike">已点赞</span>
              <span v-else>赞</span>
            </el-button>
             <el-button round  plain @click="collected">
              <i class="iconfont icon-shoucang" :class="{'like-active': isSub}"></i>
              <span v-if="isSub">已收藏</span>
              <span v-else>收藏</span>
            </el-button>
             <el-button round  plain>
              <i class="iconfont icon-fenxiang"></i>
              <span>分享</span>
            </el-button>
          </div>
        </div>
        <!-- 发送评论区域 -->
        <div class="send-comment">
          <h3>评论</h3>
          <!-- 评论输入框区域 -->
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请留下你的评论"
            v-model="textarea"
            maxlength="140"
            show-word-limit
          >
          </el-input>
          <el-button round 
           @click="sendCommment"
          >
          评论
          </el-button>
        </div>
        <!-- 评论区域 -->
        <video-comment 
          :mvid=mvid 
          @replay="replay" 
          ref="commentRef"
        >
        </video-comment>
      </div>
      <!-- 左侧推荐mv区域 -->
      <div class="right">
        <p>相关推荐</p>
        <relate-video :mvid="mvid"></relate-video>
      </div>
      <!-- 返回顶部的按钮 -->
       <div class="back-top" :class="{'back-top-amition':isBackShow}" @click="onScroll">
      </div>
    </div>
</template>
<script>
import { mvInfo, mvUrl, like, isLike, collectMv, collectedMv } from '@/api/mv.js'
import { handleComment } from '@/api/comment.js'

const VideoComment = () => import('./component/VideoComment/VideoComment.vue')
const RelateVideo = () => import('./component/RelateVideo/RelateVideo.vue')

export default {
  name: 'VideoDeatil',
  components: {
    VideoComment,
    RelateVideo 
  },
  data() {
    return {
      videoInfo: {},
      videoUrl: '',
      textarea: '',
      isLike: false,
      isSub: false,
      commentId: '',
      isBackShow: false
    }
  },
  computed: {
    mvid() {
      return this.$route.params.id
    }
  },
  created() {
    this.getMvInfo()
    this.getMvUrl()
    this.getIsLike()
    this.getCollectedMv()
  },
  mounted() {
    const videoRef = this.$refs.videoRef  
    console.log(videoRef);
    videoRef.onscroll = () => {
      console.log(videoRef.scrollTop);
      if(videoRef.scrollTop > 50) {
        this.isBackShow = true  
      } else {
        this.isBackShow = false
      }
    }
  },
  methods: {
    async getMvInfo() {
      const {data} = await mvInfo(this.mvid)
      console.log(data);
      this.videoInfo = data.data
    },
    async getMvUrl() {
      const { data } = await mvUrl(this.mvid)
      console.log(data);
      this.videoUrl = data.data.url
    },
    // 对mv点赞的执行函数
    async giveLike() {
      // 当页面刷新的时候，要判断这个mv是否已经点赞了
      // 当isLike为false时，则证明用户对这个mv没有点过赞，我们需要执行点赞的执行函数
      const cookie = window.localStorage.getItem('cookie')
      var timestamp = Date.parse(new Date());
      if(!this.isLike) {
        const data  = await like({t:1 , type: 1, id: this.mvid, cookie: cookie, timestamp: timestamp})
        console.log(data);
        this.isLike = true
      } else {
          // 那么用户点击就是取消点赞
          const { data } = await like({t:0 , type: 1, id: this.mvid, cookie: cookie, timestamp: timestamp})
          console.log(data);
          this.isLike = false
      }
    },
    // 获取用户是否对这个mv点赞的执行函数
    async getIsLike() {
      var timestamp = Date.parse(new Date());
      const cookie = window.localStorage.getItem('cookie')
      const { data } = await isLike({cookie: cookie, timestamp: timestamp})
      const likedList = data.data.feeds
      let result = likedList.findIndex(item => {
        return item.mlogBaseData.text = this.videoInfo.name
      })
      console.log(result);
      if(result!==-1) {
        this.isLike = true
      } else {
        this.isLike = false
      }
    },
    // 对mv执行收藏与取消收藏
    async collected() {
      const cookie = window.localStorage.getItem('cookie')
    // 如果用户没有收藏此mv执行收藏
      if(!this.isSub) {
        const { data } = await collectMv({ mvid: this.mvid, 
                                           t: 1, 
                                           cookie: cookie })
        await this.getCollectedMv()
        this.isSub = true
      } else {
        // 如果用户收藏了这个mv，则执行取消mv收藏
        const { data } = await collectMv({ mvid: this.mvid,
                                           t: 0, 
                                           cookie: cookie })
        console.log(data);
        this.isSub = false
      }
    },
    // 页面刷新时判断用户是否收藏了这个mv
    async getCollectedMv() {
      const cookie = window.localStorage.getItem('cookie')
      const { data } = await collectedMv({cookie: cookie})
      const result = data.data.findIndex(item => {
                       return item.title === this.videoInfo.name
                     })
      if(result!==-1) {
        this.isSub = true
      } else {
        this.isSub = false
      }
    },
    replay(data) {
      console.log(data);
      this.textarea = '@' + data.name + ':'
      this.commentId = data.id
      console.log(this.commentId);
    },
    async sendCommment() {
      const cookie = window.localStorage.getItem('cookie')
      if(this.commentId === '') {
        // 发送新的评论
        if (this.textarea.trim() !== '') {
          console.log('新增评论');
          const { data } = await handleComment({ t: 1, 
                                                 type: 1, 
                                                 id :this.mvid, 
                                                 content: this.textarea, 
                                                 cookie: cookie}) 
          console.log(data);
          if(data.code === 200) {
            this.$refs.commentRef.getMvComment(this.mvid, 20)
            this.$message.success('新增评论成功')
            this.textarea = ''
          } else {
            this.$message.info(data.message)
            this.textarea = ''
          }
        } else {
          this.textarea = ''
          return this.$message.error('评论不能为空')
        }
      } else {
      // 对评论进行回复
      // 1.对this.textarea字符串进行截取，取：后面的字符串且不能为空
      // 2.进行网络请求
        var commentStr = this.textarea.split(':')[1]
        console.log(commentStr);
        console.log(this.textarea);
        if(commentStr.trim() !== '') {
          const { data } = await handleComment({ t: 2, 
                                                 type: 1, 
                                                 id :this.mvid, 
                                                 content: commentStr, 
                                                 commentId: this.commentId, 
                                                 cookie: cookie }) 
          console.log(data)
          if(data.code === 200) {
            this.$refs.commentRef.getMvComment(this.mvid, 20)
            this.$message.success('新增评论成功')
            this.textarea = ''
          }
        } else {
          return this.$message.error('请输入回复评论')
        }
      }
    },
    onScroll() {
      this.$refs.videoRef.scrollTop = 0
      this.isBackShow = false
    }
  },
}
</script>
<style lang="less" scoped>
  .video-container {
    display: flex;
    padding: 0 20% ;
    height: 100%;
    overflow-y: auto;
    .left {
      margin-top: 15px;
      width: 496px;
      font-size: 12px;
      p {
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: bolder;
      }
      .author-area {
        margin-top: 20px;
        .author {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .pic {
            width: 35px;
            height: 35px;
            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
            }
          }
          .artist-name {
            margin-left: 15px;
            font-size: 12px;
          }
        }
        .character {
          margin-top: 10px;
          color: #aaa;
          &>span:nth-child(2)  {
            margin-left: 20px;
          }
        }
        .btns {
          margin-top: 15px;
          .el-button {
            font-size: 12px;
            padding: 5px 20px;
            .iconfont {
              font-size: 12px;
              margin-right: 5px;
            }
          }
          .el-button:hover {
            border-color: #ccc;
            color:#252525;
          }
          .el-button:focus {
            border-color: #ccc;
            color:#252525;
          }
        }
      }
      .send-comment {
        margin-top: 15px;
        h3 {
         margin-bottom: 15px;
        }
        /deep/.el-textarea {
          height: 65px;
          .el-textarea__inner {
            height: 62px;
          }
          .el-textarea__inner:focus {
            border-color: #ccc;
          }
        }
        .el-button {
          position: relative;
          left: 450px;
          margin-top: 10px;
          padding: 5px 10px;
        }
      }
    }
    .right {
      margin-top: 15px;
      margin-left: 20px;
      min-width: 300px;
      p {
       font-size: 20px;
       margin-bottom: 10px;
       font-weight: bolder;
      }
    }
    .like-active {
      color: red;
    }
    .back-top {
      position: fixed;
      bottom: -55px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #ccc;
      transition: 1s;
    }
    .back-top-amition {
      position: fixed;
      bottom:65px;
      right: 20px;
      transition: 1s;
    }
  }
</style>