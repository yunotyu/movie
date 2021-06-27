import Vue from 'vue'
import App from './App'
import Req from './request/request.js'
import uView from "uview-ui";
import utils from 'static/utils.js'

Vue.config.productionTip = false
Vue.prototype.$req=Req;
Vue.prototype.utils=utils;
Vue.use(uView);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
