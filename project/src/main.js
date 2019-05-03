import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase';

import router from './routers.js'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const config = {
    apiKey: "AIzaSyD0xjkGLxE0amB27oe1vAnvqwiaQ2cQYCo",
    authDomain: "democf-a6934.firebaseapp.com",
    databaseURL: "https://democf-a6934.firebaseio.com",
    projectId: "democf-a6934",
    storageBucket: "democf-a6934.appspot.com",
    messagingSenderId: "1053573094029"
};

firebase.initializeApp(config);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
