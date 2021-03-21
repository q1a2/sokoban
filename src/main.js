import Vue from 'vue'
import App from './App.vue'
import router from './router'
import levels from './levels.js'

Vue.config.productionTip = false

let data = {
  currentState: [],
  currentLevel: [],
  levelList: levels
}

console.log(data.currentState)
console.log(data.currentLevel)
console.log(data.levelList)

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
