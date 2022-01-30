<template>
    <div class="personnal-container">
      <!-- 创建者的信息区域 -->
      <div class="creator-area">
        <!-- 创建者头像区域 -->
        <div class="avtor">
          <img :src="creatorDetail.avatarUrl" alt="">
        </div>
        <!-- 创建者其他信息区域 -->
        <div class="creator-info">
          <p class="name">{{creatorDetail.nickname}}</p>
          <!-- 创建者等级的区域 -->
          <div class="level">
            <span>Lv{{creatorDetail.userType}}</span>
          </div>
          <!--  -->
          <div class="data-num">
            <div class="data-item">
              <div class="item-top">
                {{creatorDetail.eventCount}}
              </div>
              <div class="item-bottom">
                动态
              </div>
            </div>
            <div class="data-item">
              <div class="item-top">
                {{creatorDetail.follows}}
              </div>
              <div class="item-bottom">
               关注
              </div>
            </div>
            <div class="data-item">
              <div class="item-top">
                {{creatorDetail.followeds}}
              </div>
              <div class="item-bottom">
                粉丝
              </div>
            </div>
          </div>
          <div class="creator-id">用户id: {{creatorDetail.userId}}</div>
          <div class="creator-dec">个人描述: {{creatorDetail.signature}}</div>
        </div>
      </div>
      <!-- 歌单区域 -->
       
      <div class="song-area">
        <p>{{creatorDetail.nickname}}创建的歌单</p> 
        <div class="song">
          <div class="song-item" v-for="(item, index) in createSongs" :key="index">
            <img :src="item.coverImgUrl" alt="">
            <span>{{item.name}}</span>
          </div>
        </div>
        
      </div>
      
    </div>
</template>

<script>
import { creatorInfo, userSong } from '@/api/creator.js'
export default {
  name: 'Personnal',
  computed: {
    uid() {
      return this.$route.params.id
    }
  },
  created() {
    this.getCreatorInfo()
    this.getSongs()  
  },
  data() {
    return {
        // 歌单创建者的信息
      creatorDetail: {},
      createSongs: [],

    }
  },
  methods: {
    //   获取歌单创建者的详细信息
    async getCreatorInfo() {
      const { data } = await creatorInfo(this.uid)
      console.log(data);
      this.creatorDetail = data.profile
    },

    // 获取歌单创建者的歌单
    async getSongs() {
      const { data } = await userSong(this.uid)
      console.log(data);
      this.createSongs = data.playlist.slice(0, 30)
    }
  },    
}
</script>

<style lang="less" scoped>
   @media screen and (max-width: 1800px) {
    .personnal-container {
      .song-area {
        width: 1100px;
        position: relative;
        left: 50%;
        transform: translateX(-550px);
         .song {
          width: 100%; 
          .song-item {
            margin-top: 20px;
            width: 200px;
            height: 240px;
            img {
              width: 100%;
              height: 200px;
              border-radius: 10px;
            }
          }
        }
      }
    }
  } 
  @media screen and (max-width: 1360px) {
    .personnal-container {
      .song-area {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
        position: unset;
        left: unset;
        transform: unset;
        .song {
          width: 100%;
          .song-item {
            margin-top: 10px;
            width: 18%;
            height: auto;
            padding-bottom: 10px;
            img {
              width: 100%;
              height: auto;
              border-radius: 10px;
            }
          }
        }
      }
    }
  } 
  .personnal-container {
    .creator-area {
      display: flex;
      margin-top: 20px;
      padding: 0 20px;
      width: 100%;
      height: 180px;
      box-sizing: border-box;
      .avtor{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 150px;
        height: 180px;
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
      }
      .creator-info {
        margin-left: 20px;
        width: 100%;
        .name {
          font-size: 20px;
          font-weight: 700;
        }
        .level {
          padding: 12px 0;
          font-size: 12px;
          border-bottom: 1px solid #ccc;
          span {
            background-color: #ccc;
            padding: 0 5px;
            border-radius: 8px;
          }
        }
        .data-num {
          display: flex;
          margin-top: 10px;
          &>div:nth-child(1) {
            padding-left: unset;
            border-left: unset;
          }
          .data-item {
            padding: 0 20px;
            height: 40px;
            border-left: 1px solid #ccc;
            text-align: center;
            .item-top {
              font-size: 18px;
            }
            .item-bottom {
              height: 14px;
              font-size: 12px;
            }
          }
        }
        .creator-id {
          margin-top: 10px;
          font-size: 12px;
        }
        .creator-dec {
          margin-top: 5px;
          font-size: 12px;
        }
      }
    }
    .song-area {
     p {
       margin-top: 10px;
       font-weight: 700;
     }
     .song {
       display: flex;
       flex-wrap: wrap;
       justify-content: space-between;
       .song-item {
         cursor: pointer;
         span {
           font-size: 12px;
         }
       }
     }
    }
  }
</style>