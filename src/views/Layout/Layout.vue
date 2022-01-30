<template>
    <div class="layout-container">
      <el-container>
        <!-- 头部 -->
        <el-header height='50px'>
          <div class="left">
            <img src="../style/img/logo.png" alt="">
          </div>
          <div class="middle">
            <div>
              <i class="iconfont icon-jiantou-copy"></i>
            </div>
            <div>
              <i class="iconfont icon-arrow-right"></i>
            </div>
            <el-popover
              placement="bottom-start"
              width="300"
              trigger="focus"
              class="search-popover">
              <!-- 输入关键字展示的联想搜索界面 -->
              <suggest-search v-if="searchInput" :searchValue="searchInput"></suggest-search>
              <!-- 点击搜索框展示默认的热搜榜 -->
              <default-search v-else></default-search>
              <el-input 
                v-model="searchInput" 
                ref="searchRef"
                placeholder="请输入内容" 
                prefix-icon="el-icon-search" 
                slot="reference" 
                @click.native="$refs.searchRef.focus"
              >
              </el-input>
            </el-popover>
          </div>
          <!-- 用户登录了的展示 -->
          <el-popover
           placement="bottom"
           width="200"
           trigger="click"
           v-model="quiteShow"
          > 
            <div class="quite-btn" >
              <el-button type="warning" @click="quiteLogin">
                退出登录
              </el-button>
            </div>
            <div slot="reference" class="user-logined" v-if="$store.state.userInfo">
               <el-image
                :src="$store.state.userInfo.avatarUrl"
                fit="fit"
                round>
              </el-image>
              <p>{{$store.state.userInfo.nickname}}</p>
            </div>
          </el-popover>
         <!-- 用户没有登录的展示 -->
          <el-popover
            placement="bottom"
            width="300"
            trigger="click"
            v-model="loginShow"
          > 
             <div class="right" slot="reference" v-if="!$store.state.userInfo">
              <img src="../style/img/test.b66d0610.jpg" alt="">
              <span>点击登录用户</span>
            </div> 
             <el-form label-width="70px" :model="userform" :rules="userFormRules" ref="userFormRef">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="userform.phone"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userform.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="onLogin">登录</el-button>
              </el-form-item>
              <el-form-item>
                <el-button>注册</el-button>
              </el-form-item>
            </el-form> 
          </el-popover>
        </el-header>
        <el-container class="container">
          <!-- 侧边栏 -->
          <el-aside width="200px">
            <el-menu
              router
              :default-active="defaultIndex"
            >
              <el-menu-item-group>
                <el-menu-item index="discovery" :route="{path: '/discovery'}">
                 <template slot="title">
                   <i class="iconfont icon-yinle"></i>
                   <span>发现音乐</span>
                 </template>
                </el-menu-item>
                <el-menu-item index="video" :route="{path: '/video'}"> 
                  <template slot="title">
                   <i class="iconfont icon-shipin-"></i>
                   <span>视频</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="collect" :route="{path: '/collect'}">
                  <template slot="title">
                   <i class="iconfont icon-shoucang"></i>
                   <span>收藏</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="recommend" :route="{path: '/recommend'}">
                  <template slot="title">
                   <i class="iconfont icon-tuijian"></i>
                   <span>每日推荐</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <!-- 底部占位 -->
      <div class="footer"> 
        <music-play></music-play>
      </div>
    </div>
</template>
<script>
import { login } from '@/api/user.js'

import SuggestSearch from './components/SuggestSearch.vue'
const DefaultSearch = () => import('./components/DefaultSearch.vue')
const MusicPlay = () => import('../MusicPlay/MusicPlay.vue')

export default {
  name: 'Layout',
  components: {
    DefaultSearch,
    SuggestSearch,
    MusicPlay
  },
  data() {
    return {
      searchInput : '',
      loginShow: false,
      searchShow: false,
      quiteShow: false,
      // 用户的登录信息
      userform: {
        phone: '',
        password: null
      },
      // 用户登录的验证规则
      userFormRules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  }, 
  computed: {
    defaultIndex() {
      const defautPath = this.$route.path.split('/')
      return defautPath[1]
    }
  },
  methods: {
    onLogin() {
      this.$refs.userFormRef.validate(async(valite) => {
        if (valite) {
          const { data }   = await login({phone: this.userform.phone, password: this.userform.password, withCredentials: true})
          console.log(data);
          if(data.code === 200) {
            this.$message.success('登录成功')
            console.log(data);
            // 如果响应状态码是200，我们可以将返回的用户信息存到本地存储里面
            // window.localStorage.setItem('userInfo',JSON.stringify(data.profile))
             window.localStorage.setItem('cookie',data.cookie)
            this.loginShow = false
            this.quiteShow = false
            this.$store.commit('setUserInfo',data.profile)
          } else {
            this.$message.error(data.msg)
            this.loginShow = false
          }
        }
      })
      
    },
    // 退出登录的执行函数
    quiteLogin() {
      this.$store.commit('deleteUserInfo')
      // 清除本地保存的cookie
       window.localStorage.removeItem('cookie')
      this.$message.info('已退出登录')
      this.quiteShow = false
      this.loginShow = false
    },
  },
}
</script>
<style lang="less" scoped>
   .layout-container {
     /deep/.el-header {
      //  position: fixed;
      //  top: 0;
       display: flex;
       justify-content: space-between;
       align-items: center;
       width: 100%;
       background-color: #eb2d1f;
       .left {
         flex: 1;
         display: flex;
         align-items: center;
         box-sizing: border-box;
         img {
           width: 110px;
           height: 26px;
         }
         
       }
       .middle {
         flex: 4;
         div {
           display: inline-block;
           margin-left: 5px;
           width: 20px;
           height: 20px;
           text-align: center;
           background-color: rgb(200, 235, 235,.8);
           border-radius: 50%;
           color: #fff;
         }
        .el-input {
          margin-left: 25px;
          width: 250px;
          .el-input__inner {
            height: 25px;
            border-radius: 15px;
          }
          .el-icon-search {
            line-height: 24px;
          }
        }
       }
       .right {
         flex: 1;
         display: flex;
         align-items: center;
         justify-content: flex-end;
         color: #fff;
         font-size: 12px;
         padding-right: 30px;
         box-sizing: border-box;
         img {
           width: 30px;
           height: 30px;
           border-radius: 50%;
           margin-right: 10px;
         }
       }
       .user-logined {
          display: flex;
          align-items: center;
          .el-image {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          p {
            margin-left: 10px;
          }
       }
      }
     .el-aside {
       height:  calc(100vh - 100px);
       .el-menu {
         height: 100%;
         /deep/.el-menu-item-group {
         .el-menu-item-group__title {
           padding: unset;
         }
         .el-menu-item {
           height: 38px;
           line-height: 38px;
           font-size: 12px;
           .iconfont {
             margin-right: 5px;
           }
         }
         }
       }
      }
     .el-main {
      height:  calc(100vh - 100px);
      padding: 0 0;
      }
     .footer {
       position: fixed;
       bottom: 0;
       width: 100%;
       border-top: 1px #ccc solid;
       height: 49px;
       background-color: #fff;
       z-index: 99;
      }
    }
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        /deep/.el-form-item__label {
        font-size: 12px;
        }
        /deep/.el-input {
        font-size: 12px;
          .el-input__inner {
          height: 30px;
          line-height: 30px;
          }
        }
        .el-button {
          width: 200px;
          height: 30px;
          line-height: 30px;
          padding: 0 20px;
        }
      }
     }
    .quite-btn {
      .el-button {
        width: 200px;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
      }
    }
    .search-popover {
      padding: unset;
    }
  
</style>