import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import firebase from './firebase'
import './registerServiceWorker'

Vue.config.productionTip = false

let app;

let global = new Vue({
  data: {
    loading: false
  }
});

global.install = function() {
  Object.defineProperty(Vue.prototype, '$global', {
    get() { return global; }
  });
}

Vue.use(global);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      firebase,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})