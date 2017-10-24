import Vue from 'vue/dist/vue.esm.js'
import {Keyframes} from 'vue-keyframes';
window.Vue = Vue;

Vue.use(Keyframes);
Vue.component('prompt', {
	"template" : '<span class="prompt">~/<slot></slot> $ </span>'
});


var app = new Vue({
    el: '#app',
});