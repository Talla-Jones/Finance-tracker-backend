import { createRouter, createWebHistory } from 'vue-router'
import Register from '../register.vue'
import Login from '../login.vue'
import Dashboard from '../dashboard.vue'
import Transactions from '../transactions.vue'
import summary from '../summary.vue'
import Results from '../results.vue'
import Profile from '../profile.vue'

const routes = [
  { path: '/register', component: Register },
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/transactions', component: Transactions },
  { path: '/summary', component: summary },
  { path: '/results', component: Results},
  { path: '/Editprofile', component: Profile}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
