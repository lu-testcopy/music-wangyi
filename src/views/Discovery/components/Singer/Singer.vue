<template>
    <div class="singer-container">
     <!-- 歌手语种分类 -->
     <div class="singer-language">
       <div class="title">语种:</div>
       <div class="bar">
         <div 
           class="bar-item" 
           :class="{active: languageIndex===index}"
           v-for="(item, index) in languages" 
           :key="index"
           @click="seclectLanguage(index)"
        >
          {{item.name}}
        </div>
       </div>
     </div>
     <!-- 分类区域 -->
     <div class="singer-language">
       <div class="title">分类:</div>
       <div class="bar">
         <div 
           class="bar-item" 
           :class="{active: classifyIndex === index}"
           v-for="(item, index) in classifes" 
           :key="index"
           @click="selectClassify(index)"
         >
           {{item.name}}
         </div>
       </div>
     </div>
     <!-- 字母区域 -->
     <div class="singer-letter">
       <div class-letters="title">筛选：</div>
       <div class="bar">
         <div 
           class="bar-item" 
           :class="{active:letterIndex===index}"
           v-for="(item,index) in letters" 
           :key="index"
           @click="selectLetter(index)"
        >
           {{item.name}}
         </div>
       </div>
     </div>
     <!-- 歌手列表区域 -->
     <div class="singer"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
       <!--  -->
       <div 
         class="singer-item" 
         v-for="(item, index) in singerList" 
         :key="index"
         @click="$router.push({name: 'singdetail', params: {id:item.id}})"
       >
         <img :src="item.picUrl" alt="">
         <p>{{item.name}}</p>
       </div>
     </div>
    </div>
</template>
<script>
import { singerList } from '@/api/singer.js'
export default {
  name: 'Singer',
  created() {
    // this.getSingerList()
  },
  data() {
    return {
      languages: [{area:'-1',name:'全部'}, {area:'7',name:'华语'}, {area:'96',name:'欧美'}, {area:'8',name:'日本'}, {area:'16',name:'韩国'}, {area:'0',name:'其他'}],
      classifes: [{type: '-1',name: '全部'}, {type: '1',name: '男歌手'}, {type: '2',name: '女歌手'}, {type: '3',name: '乐队'}],
      letters:[{name:'热门',initial: '-1'}, {name: 'A' ,initial:'a'}, {name: 'B', initial:'b'}, {name: 'C', initial:'c'}, {name: 'D', initial:'d'}, {name: 'E', initial:    'e'}, {name: 'F', initial:'f'}, {name: 'G', initial:'g'}, {name:'H', initial:'h'}, {name: 'I', initial:'i'}, {name: 'G', initial:'g'}, {name: 'K', initial:'k'},  {name: 'M', initial:'m'}, {name: 'N', initial:'n'}, {name: 'O', initial:'o'}, {name: 'P', initial:'p'}, {name: 'Q', initial:'Q'}, {name: 'r', initial:'R'}, {name:  's', initial:'S'}, {name: 'T', initial: 't'}, {name: 'U', initial: 'u'}, {name: 'V', initial: 'v'}, {name: 'W',initial: 'w'},{name: 'X', initial: 'x'}, {name: 'Y', initial: 'y'}, {name: 'Z', initial: 'z'}, {name: '#', initial:'0'}],
      offset: 0,
      // 点击语种的item项，给定的索引号
      languageIndex: 0,
      classifyIndex: 0,
      letterIndex: 0,
      singerList: [],
      disabled: false
    }
  },
  methods: {
    // 获取歌手列表执行的函数
    async load() {
      this.disabled = true
      const { data } = await singerList({type: this.classifes[this.classifyIndex].type, 
                                       area: this.languages[this.languageIndex].area,
                                       initial: this.letters[this.letterIndex].initial,
                                       offset: this.offset
                                       })
      const results = data.artists
      this.singerList.push(...results)
      if(results!==0) {
        this.disabled = false
        this.offset += 30
      }
    },
    //选择语言分类执行的函数
    seclectLanguage(index) {
      this.languageIndex = index
      this.afreshSend()
    },
    // 选择歌手类别分类执行的函数
    selectClassify(index) {
      this.classifyIndex = index
       this.afreshSend()
    },
    // 选择首字母获取歌手列表执行的函数
    selectLetter(index) {
      this.letterIndex = index
      this.afreshSend()
    },
    // 点击发送新的网络请求
    afreshSend() {
      this.singerList = []
      this.load()
    }
  },
}
</script>
<style lang="less" scoped>
   .singer-container {
      padding: 0 12%;
      margin-top: 60px;
      .singer-language {
        display: flex;
        margin-bottom: 15px;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        .bar {
          display: flex;
          flex-wrap: wrap;
          .bar-item {
            margin-left: 15px;
            cursor: pointer;
            width: 50px;
            height: 24px;
            text-align: center;
          }
        }
      }
      .singer-letter {
         display: flex;
         font-size: 13px;
         .bar {
           width : calc(100% - 60px);
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-left: -10px;
           .bar-item {
             margin-left: 15px;
             margin-bottom: 10px;
             cursor: pointer;
             width: 50px;
             height: 24px;
             text-align: center;
           }
         }
      }
      .singer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 15px;
        .singer-item {
           width: 180px;
           height: 220px;
           cursor: pointer;
           img {
            width: 180px;
            height: 180px;
            border-radius: 10px;
           }
           p {
             font-size: 13px;
           }
        }
      }
   }
   .active {
     color: red;
     background-color: #FF7F50;
     padding: 2px 2px;
     height: 22px;
     line-height: 18px;
     box-sizing: border-box;
     border-radius: 10px;
   }
</style>