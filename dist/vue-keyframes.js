module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyframes = __webpack_require__(1);

Object.defineProperty(exports, "Keyframes", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_keyframes).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
vue-keyframes
Developed by: Prev Wong	(imprev.co)
Documentation: https://prevwong.github.io/vue-keyframes/
Github: https://github.com/prevwong/vue-keyframes/
License: MIT (https://raw.githubusercontent.com/prevwong/vue-keyframes/master/LICENSE)
**/

var Keyframes = {
	install: function install(Vue) {
		Vue.component('Keyframes', {
			mounted: function mounted() {
				this.animateNextFrame();
				if (!JSON.parse(this.autoRun)) {
					this.stop = true;
				}
			},

			template: '<div></div>',
			watch: {
				stop: function stop(val) {
					if (!val) {
						this.animateNextFrame();
					}
				}
			},
			methods: {
				callFn: function callFn(fn, noFrame) {
					if (fn !== false && typeof fn === 'function') {
						noFrame ? fn(this.$el) : fn(this.$el, this.frameNum);
					} else if (fn !== false && window[fn] !== undefined) {
						noFrame ? window[fn](this.$el) : window[fn](this.$el, this.frameNum);
					} else {
						return false;
					}
				},
				animateNextFrame: function animateNextFrame() {
					var _this = this;

					if (this.stop == true) {
						return false;
					}
					if (this.frameNum > 0) {
						var freeze = this.frames.data[this.frameNum - 1].freeze;
						if (!freeze) {
							Vue.set(this.frames.visibility, this.frameNum - 1, false);
						}
					}
					Vue.set(this.frames.visibility, this.frameNum, true);
					setTimeout(function () {
						// if ( this.frameNum === 0 ) {
						_this.callFn(_this.onAnimate);
						// }
					});
					this.waitForDelay(function () {
						if (_this.frameNum < Object.keys(_this.frames.data).length - 1) {
							_this.frameNum++;
							_this.animateNextFrame();
						} else {
							_this.callFn(_this.onEnd, true);
							if (JSON.parse(_this.loop)) {
								_this.resetFrames();
							}
						}
					});
				},
				waitForDelay: function waitForDelay(fn) {
					var currentFrame = this.frames.data[this.frameNum];
					var delay = this.frameNum === -1 ? this.delay : currentFrame.duration;
					clearTimeout(this.timer);
					this.timer = setTimeout(fn, delay);
				},
				resetFrames: function resetFrames() {
					for (var i in this.frames.visibility) {
						if ({}.hasOwnProperty.call(this.frames.visibility, i)) {
							Vue.set(this.frames.visibility, i, false);
						}
					}
					this.frameNum = -1;
					this.animateNextFrame();
				}
			},
			data: function data() {
				return {
					register: false,
					frames: { visibility: {}, data: {} },
					frameNum: -1,
					timer: null,
					count: 0,
					stop: false
				};
			},

			props: {
				loop: { default: false },
				delay: { default: 0 },
				onAnimate: { default: false },
				onEnd: { default: false },
				autoRun: { default: true },
				component: { default: 'div' }
			},
			render: function render(createElement) {
				var _this2 = this;

				if (!this.register) {
					var _children = this.$slots.default.filter(function (node) {
						return !node.text;
					});
					_children.map(function (child, index) {
						_this2.resetFrames();
						var duration = 200;
						var freeze = false;
						if (child.data !== undefined && child.data.attrs !== undefined) {
							duration = child.data.attrs.duration === undefined ? 200 : child.data.attrs.duration;
							freeze = child.data.attrs.freeze === undefined ? false : child.data.attrs.freeze;
						}
						Vue.set(_this2.frames.data, index, {
							duration: parseInt(duration, 10),
							freeze: freeze
						});
						if (index === _children.length - 1) {
							_this2.register = true;
						}
						return true;
					});
				}
				var children = this.$slots.default.filter(function (node) {
					return !node.text;
				}).map(function (child, index) {
					var val = null;
					if (_this2.frames.visibility[index]) {
						if (child.data !== undefined && child.data.attrs !== undefined) {
							delete child.data.attrs.freeze;
							delete child.data.attrs.duration;
						}
						val = child;
					} else {
						Vue.set(_this2.frames.visibility, index, false);
						val = false;
					}
					return val;
				});

				var x = createElement(this.component, {}, children);
				return x;
			}
		});
	}
};

exports.default = Keyframes;

/***/ })
/******/ ]);