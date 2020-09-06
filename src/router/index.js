import About from '@/components/About.vue'
import Login from '@/components/auth/Login.vue'
import Logout from '@/components/auth/Logout.vue'
import Register from '@/components/auth/Register.vue'
import EventGrid from '@/components/events/EventGrid.vue'
import EventList from '@/components/events/EventList.vue'
import Home from '@/components/Home.vue'
import Tickets from '@/components/Tickets.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/events',
    name: 'events',
    component: EventGrid
  },
  {
    path: '/my-events',
    name: 'my-events',
    component: EventList
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: Tickets
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
