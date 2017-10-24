const VueKeyframes = {
	install(Vue) {
		Vue.component('Keyframe', {
			mounted() {
				this.animateNextFrame();
			},
			template: '<div></div>',
			methods: {
				callFn(fn) {
					if ( fn && typeof (fn) === 'function') {
						fn( this.$el );
					} else if ( fn && window[fn] !== undefined ) {
						window[fn]( this.$el );
					} else {
						return false;
					}
				},
				animateNextFrame() {
					if ( this.frameNum === 1 ) {
						this.callFn(this.onStart);
					}
					if ( this.frameNum > 0 ) {
						const freeze = this.frames.data[this.frameNum - 1].freeze;
						if ( !freeze ) {
							Vue.set(this.frames.visibility, this.frameNum - 1, false);
						}
						Vue.set(this.frames.visibility, this.frameNum, true);
					}
					this.waitForDelay(() => {
						if ( this.frameNum < Object.keys(this.frames.data).length - 1) {
							this.frameNum++;
							this.animateNextFrame();
						} else {
							this.callFn(this.onEnd);
							if ( this.loop === 'repeat' ) {
								this.resetFrames();
							}
						}
					});
				},
				waitForDelay(fn) {
					const currentFrame = this.frames.data[this.frameNum];
					const delay = this.frameNum === -1 ? this.delay : currentFrame.duration;
					clearTimeout(this.timer);
					this.timer = setTimeout(fn, delay);
				},
				resetFrames() {
					for ( const i in this.frames.visibility ) {
						if ( {}.hasOwnProperty.call(this.frames.visibility, i) ) {
							Vue.set(this.frames.visibility, i, false);
						}
					}
					this.frameNum = -1;
					this.animateNextFrame();
				}
			},
			data() {
				return {
					register: false,
					frames: {visibility: {}, data: {}},
					frameNum: -1,
					timer: null,
					count: 0
				};
			},
			props: {
				loop: {default: false},
				delay: {default: 0},
				onStart: {default: false},
				onEnd: {default: false},
				component: {default: 'div'}
			},
			render(createElement) {
				if ( !this.register ) {
					const myChildren = this.$slots.default
									.filter(node => !node.text);

					myChildren.map((child, index) => {
						this.resetFrames();
						Vue.set(this.frames.data, index, {
							duration: parseInt(child.data.attrs.duration, 10),
							freeze: child.data.attrs.freeze
						});
						if ( index === myChildren.length - 1 ) {
							this.register = true;
						}
						return true;
					});
				}

				const myChildren = this.$slots.default
								.filter(node => !node.text)
								.map((child, index) => {
									let val = null;
									if ( this.frames.visibility[index] ) {
										delete child.data.attrs.freeze;
										delete child.data.attrs.duration;
										val = child;
									} else {
										Vue.set(this.frames.visibility, index, false);
										val = false;
									}
									return val;
								});

				const x = createElement(
					this.component,
					{},
					myChildren
				);
				return x;
			}
		});
	}
};

export default VueKeyframes;
