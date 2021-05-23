require('./bootstrap');

import Vue from 'vue'

import App from './vue/app.vue'
import Favorites from './vue/pages/favorites.vue'
import Home from './vue/pages/home.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/fav', component: Favorites }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

const app = new Vue({
    el: '#app',
    components: { App },
    router
}).$mount('#app')
