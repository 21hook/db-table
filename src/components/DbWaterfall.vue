<template>
  <div>
    <el-row v-for="i in 24">
      <el-col :span="24">
        <div style="padding: 14px; text-align: left">
          <span>好吃的汉堡</span>
          <div class="bottom">
            <span class="product-attr">颜色：</span><br>
            <span class="product-attr">尺码：</span><br>
            <span class="product-attr">价格：</span><br>
            <time class="product-attr">{{ new Date(Date.now()) }}</time>
          </div>
        </div>
      </el-col>
      <el-col :span="4" v-for="j in 6">
        <el-card class="box-card">
          <img src="../../src/assets/images/hamburger.png" style="width: 100%">
        </el-card>
      </el-col>
    </el-row>

    <!-- [[], [], []], -->
    <el-row v-for="row in imgURLs">
      <el-col :span="24">
        <div style="padding: 14px; text-align: left">
          <span>好吃的汉堡</span>
          <div class="bottom">
            <span class="product-attr">颜色：</span><br>
            <span class="product-attr">尺码：</span><br>
            <span class="product-attr">价格：</span><br>
            <time class="product-attr">{{ new Date(Date.now()) }}</time>
          </div>
        </div>
      </el-col>
      <el-col :span="4" v-for="col in row">
        <el-card>
          <img class="waterfall-img" :data-url="col">
        </el-card>
      </el-col>
    </el-row>
    <!-- back to top button -->
    <el-button class="btn-back-to-top"
               v-if="backToTop"
               @click="scrollToTop"
               style=""
               icon="el-icon-caret-top"
               circle></el-button>
    <!-- loading modal -->
    <div class="modal-loading"
         v-loading="loading"
         element-loading-text="加载中"
         element-loading-spinner="el-icon-loading">
      <span v-if="!loading">没有更多了</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Card, Loading, Button } from 'element-ui'
import ajax from '@/libs/http/ajax'

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Button)
export default {
  name: 'DbWaterfall',
  components: {},
  /* Simple & adequate interface to manipulate the component */
  props: {
    justifyDirection: {
      type: String,
      default: 'row'
    },
    alignItems: {
      type: Number,
      required: true,
      default: 6
    }
  },
  created () {
    // code/program after created
    this.getDetails(this.pageNo)
  },
  // mounted on a DOM element
  mounted () {
    this.initScroll()
  },
  methods: {
    /* behaviour */
    /* creator */
    /* get the VD data;
     * create the VD structure;
     * get/set the VD content
     */
    getDetails (pageNo) {
      const self = this

      // APIs/network interfaces
      ajax({
        method: 'POST',
        url: 'http://daily.qundian.elephtribe.com/api/procurement/wxhc/brand/query',
        data: {
          pageNo,
          pageSize: this.alignItems
        },
        success: resBody => {
          if (resBody.entry.length !== 0) {
            const arr = []
            /* async code/program */
            // [{logo: }, {logo: }]
            // ['', '', '', '']
            // [['', ''], ['', '']]
            resBody.entry.forEach(elt => {
              arr.push(`${self.imgCdnPath}${elt.logo}`)
            })

            // ['', '', '', '']
            // element slicing
            // [['', ''], ['', '']]
            const imgURLs = self.imgURLs
            const ROW_LENGTH = 6

            for (let i = 0; i < arr.length; i += ROW_LENGTH) {
              imgURLs.push(arr.slice(i, i + ROW_LENGTH))
            }
          } else {
            self.loading = false
          }
        }
      })
    },
    /* interactions */
    initScroll () {
      document.addEventListener('scroll', e => {
        /* action code/program */
        /* perceptual situation in env/condition-action rule */
        // get the visual viewport
        // set its src attr if the point is in it
        const images = document.querySelectorAll('img.waterfall-img')
        const row = document.querySelectorAll('div.el-row')[24]

        // load images lazily
        for (const i in images) {
          if (i !== 'length') {
            const img = images[i]

            if (img.offsetTop + row.offsetTop < window.innerHeight + window.scrollY) {
              img.src = img.dataset['url']
            }
          }
        }

        // show the button for backing to top
        this.backToTop = window.scrollY > window.innerHeight

        // request more image URLs to the further rendering
        if (document.body.offsetHeight < window.scrollY + window.innerHeight) {
          // request resources to get the data
          this.getDetails(++this.pageNo)
        }
      })
    },
    scrollToTop () {
      // procedural animation
      window.webkitRequestAnimationFrame(this.scrollOnce)
    },
    scrollOnce () {
      // y -= 20 per frame
      window.scrollBy(0, -500) // update the properties of the current frame

      if (window.scrollY > 0) { // condition for continue animating
        window.webkitRequestAnimationFrame(this.scrollOnce)
      }
    }
  },
  computed: {

  },
  watch: {

  },
  data () {
    return {
      imgCdnPath: 'http://cdn.elephtribe.com/',
      cols: '',
      imgURLs: [], // 2D array
      loading: true,
      backToTop: false,
      pageNo: 1
    }
  }
}

</script>

<style scoped>
  .product-attr {
    font-size: 13px;
    color: #999;
    line-height: 20px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .waterfall-img {
    width: 100%;
    display: block;
  }
  .btn-back-to-top {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 3000
  }
  .modal-loading {
    width: 100%;
    height: 40px;
    border-top: 1px solid #E4E7ED;
    margin-top: 20px
  }
</style>
