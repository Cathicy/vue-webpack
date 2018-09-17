import Vue from 'vue' //把vue内库引用进来
import App from './app.vue'

import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/bg.jpeg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h) => (App) //把vue组件的内容挂载到html中
}).$mount(root)