import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stake from "../views/Stake.vue"
import Auction from "../views/Auction.vue"
import Dividends from "../views/Dividends.vue"
import Referral from "../views/Refer.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auction',
    name: 'Auction',
    component: Auction,
    props: true
  },
  {
    path: '/stake',
    name: 'Stake',
    component: Stake,
  },
  {
    path: '/dividends',
    name: 'Dividends',
    component: Dividends,
  },
  {
    path: '/referral',
    name: 'Referral',
    component: Referral,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
