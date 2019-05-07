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

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDw8oum4tDUzrJdhJU87cdqlivQGGyfryY",
    authDomain: "facilioio.firebaseapp.com",
    databaseURL: "https://facilioio.firebaseio.com",
    projectId: "facilioio",
    storageBucket: "facilioio.appspot.com",
    messagingSenderId: "860642782476",
    appId: "1:860642782476:web:db629b87f7589693"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
