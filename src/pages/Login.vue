<template>
  <!-- Component reference -->
  <div class="content">
    <el-form :model="form" ref="form" :rules="form.rules" class="form-login">
      <h2>好衣库商家后台</h2>
      <el-form-item prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-row>
          <el-col :span="8">
            <el-input type="password" v-model="form.authCode" placeholder="6位验证码"></el-input>
          </el-col>
          <el-col :span="16">
            <el-button type="primary" :style="{float: 'right'}" @click="getAuthCode">验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Form, FormItem, Input, Button } from 'element-ui'
import ajax from '@/libs/http/ajax'
import Util from '@/libs/util' // default export; a function
import { baseURL } from '@/libs/http/HTTP' // named export; single import


/* element-ui component registration */
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

/* private instance fields & methods */

export default {
  name: 'login',
  components: {},
  /* private ins methods */
  methods: {
    getAuthCode () {
      const searchParam = `?mobile=${this.form.mobile}`

      ajax('GET', `${baseURL}/member/sendAuthCode.do${searchParam}`)
    },
    submitForm () {
      // form field verification
      if (this.form.mobile === '' || !this.form.patt.mobile.test(this.form.mobile)) {
        return false
      }
      if (this.form.authCode === '' || !this.form.patt.authCode.test(this.form.authCode)) {
        return false
      }


      // concurrency process, handle HTTP response
      const handleLogin = resBody => {
        Util.toast('登录成功', 'succeed', 1500)
        window.location.href = 'home'
      }

      ajax('POST', `${baseURL}/member/supplierHaoyikuLogin.do`,
        {
          mobile: this.form.mobile,
          code: this.form.authCode
        }, handleLogin)
    }
  },
  data () {
    let validateMobile = (rule, value, callback) => {
      let patt = /^[\d]{11}$/

      if (!patt.test(value)) {
        callback(new Error('请输入正确的手机号'))
      }
    }
    let validateCode = (rule, value, callback) => {
      let patt = /^[\d]{6}$/ // match from the start point rather than the last match point

      if (!patt.test(value)) {
        callback(new Error('请输入6位数字'))
      }
    }

    return {
      form: {
        mobile: '',
        authCode: '',
        rules: {
          mobile: [
            { trigger: 'blur', required: true, message: '请输入手机号' },
            { triger: 'blur', validator: validateMobile }

          ],
          pwd: [
            { trigger: 'blur', required: true, message: '请输入验证码' },
            { validator: validateCode, trigger: 'blur' }
          ]
        },
        patt: {
          mobile: /^[\d]{11}$/,
          authCode: /^[\d]{4}$/,
        }
      }
    }
  }
}
</script>

<style scoped>
.content {
  clear: left;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.form-login {
  width: 340px;
  background-color: #eee;
  border-radius: 4px;
  padding: 40px;
}
.form-login p {
}
</style>
