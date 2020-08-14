import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import user from './views/user.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/user',
          name: 'houme',
          component: user,
        }
      ]
    },
  ]
})
