import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserList from '../pages/UserList'
import Detail from '../pages/Detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home page',
      component: Home
    },
    {
      path: '/home',
      name: 'test',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'user list',
      component: UserList
    },
    {
      path: '/detail',
      name: 'waterfall',
      component: Detail
    }
  ]
})
