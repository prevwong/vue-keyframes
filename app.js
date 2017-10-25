import Vue from 'vue/dist/vue.esm.js'
import {Keyframes} from 'vue-keyframes';
window.Vue = Vue;

console.log(Keyframes)
Vue.use(Keyframes);
Vue.component('prompt', {
	"template" : '<span class="prompt"><b>~ <i class="material-icons">arrow forward</i></b><span class="c"><slot></slot></span class="c"><caret v-if="noCaret==\'false\'"></caret><git :updated="updated" :time="time"></git></span>',
	"props" : {
		"noCaret" : {
			default: 'false'
		},
		"updated" : {default: false},
		"time" : {default: "2"}
	},
	void_element: true 
});


Vue.component('caret', {
	"template" : '<span class="caret"></span>',
	void_element: true // allow the template to be a void element
});

Vue.component('git', {
	"template" : '<span :class="{updated: updated}" class="git"><b>master</b><i v-if="updated" class="material-icons">close</i><time>{{time}}m</time></span>',
	props : {
		updated: {default:false},
		time: {default: "2"}
	},
	void_element: true // allow the template to be a void element
});


var app = new Vue({
    el: '#app',
});

app.$refs.custom_trigger.addEventListener("click", (e) => {
	app.$refs.myKeyframes.stop = false;
	e.target.parentNode.removeChild(e.target); // remove button
})

app.$refs.replayTerminal.addEventListener("click", (e) => {
	app.$refs.ho.stop = false;
	app.$refs.ho.resetFrames();
})

app.$refs.repeat.addEventListener("click", (e) => {
	app.$refs.myKeyframes0.resetFrames();
})