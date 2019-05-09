import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'

import firebase from 'firebase';
import router from './routers.js'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(Notifications)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// npm install --save firebase
var firebaseConfig = {
    apiKey: "AIzaSyDj7BOLzFxVPL1jg0B3SWYK4VBk_ljvCMo",
    authDomain: "taller2-43f48.firebaseapp.com",
    databaseURL: "https://taller2-43f48.firebaseio.com",
    projectId: "taller2-43f48",
    storageBucket: "taller2-43f48.appspot.com",
    messagingSenderId: "306110492418",
    appId: "1:306110492418:web:b7bc3366c34486f4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
