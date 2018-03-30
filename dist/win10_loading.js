(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.win10Loading = factory());
}(this, (function () { 'use strict';

	function start() {
		if (this.mask & 1) {
			var me = this;
			this.mask=6;
			loop();
		}
		function loop() {
			var time = new Date().getTime();
			for (var i = 0; i < me.length; i++) {
				me.levelQueue[i].next(time);
			}
			me.timer = setTimeout(loop, 15);
		}
	}

	function _arrTraverse(arr, fn, Re) {
		var newArr = [], i, len, re;
		if (isArray(arr)) {
			len = arr.length;
			for (i = 0; i < len; i++) {
				re = fn.call(null, arr[i], i, arr);
				newArr.push(re);
			}
			if (Re) {
				return newArr;
			}
		}
	}


	function isArray(arr) {
		return Object.prototype.toString.call(arr) == '[object Array]';
	}

	function _extend(target, obj) {
		for (var key in obj) {
			target[key] = obj[key];
		}
	}

	function pause() {
		if (this.mask & 2) {
			this.mask = 5;
			clearTimeout(this.timer);
			var nowTime = new Date().getTime();
			_arrTraverse(this.levelQueue, function (VerticalList) {
				VerticalList.pause(nowTime);
			});
		}
	}

	var support = {};
	!function () {
		
		if (!-[1,]) {
			support.old = true;
			
			
		}
	}();

	function hidden(ele) {
		ele.style.display = 'none';
	}

	function stop() {
		if (this.mask & 4) {
			this.mask = 1;
			clearTimeout(this.timer);
			
			_arrTraverse(this.levelQueue, function (VerticalList) {
				VerticalList.init(function () {
					hidden(this.ele);
				});
			});
		}
	}

	function AnimationLauncher(levelQueue) {
		this.levelQueue = levelQueue;
		this.length = levelQueue.length;
		this.mask = 1;
	}


	_extend(AnimationLauncher.prototype, {
		start: start,
		pause: pause,
		stop: stop,
		support: support
	});

	function win10Loading(options) {
		
		
		return new AnimationLauncher();
	}

	return win10Loading;

})));
//# sourceMappingURL=win10_loading.js.map
