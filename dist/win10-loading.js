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
				me.levelList[i].next(time);
			}
			me.timer = setTimeout(loop, 15);
		}
	}

	function pause() {
		if (this.mask & 2) {
			this.mask = 5;
			clearTimeout(this.timer);
			var nowTime = new Date().getTime();
			this.levelList.forEach(function (VerticalList) {
				VerticalList.pause(nowTime);
			});
		}
	}

	var vendor = (function () {
		var elementStyle = document.createElement('div').style;
		var transformNames = [
			'webkitTransform', 'MozTransform', 'OTransform',
			'msTransform',
			'transform'];
		var length = transformNames.length;
		while (length--) {
			if (elementStyle[transformNames[length]] !== undefined) {
				return transformNames[length];
			}
		}
		
	})();

	function isArray(arr) {
		return Object.prototype.toString.call(arr) == '[object Array]';
	}

	function _extend(target, obj) {
		for (var key in obj) {
			target[key] = obj[key];
		}
		return target;
	}

	function _createSingleElement(tag, options) {
		var element = document.createElement(tag);
		
		var styles = options.styles;
		for (var key in styles) {
			element.style[key] = styles[key];
		}
		element.innerHTML = options.inner || '';
		return element;
	}

	function hidden(ele) {
		ele.style.display = 'none';
	}

	function manipulation(value) {
		this.ele.style[vendor] = 'rotate(' + value + 'deg)';
	}

	function voidFn() {

	}

	function stop() {
		if (this.mask & 4) {
			this.mask = 1;
			clearTimeout(this.timer);

			this.levelList.forEach(function(VerticalList) {
				VerticalList.init(function() {
					hidden(this.ele);
				});
			});
		}
	}

	function AnimationLauncher(levelList) {
		this.levelList = levelList;
		this.length = levelList.length;
		this.mask = 1;
	}

	_extend(AnimationLauncher.prototype, {
		start: start,
		pause: pause,
		stop: stop
		
	});

	function _create(options) {
		var relativeElement = options.relative;
		var isBody = relativeElement.nodeName === 'BODY',
			width = options.width,
			ballWidth = options.ballWidth,
			wrap,
			i = 0,
			color,
			total = options.total,
			elList = [],
			fragment = document.createDocumentFragment(),
			colors = options.color,
			containerProperty = {
				styles: {
					position: 'relative',
					width: width + 'px',
					height: width + 'px'
				}
			},
			wrapProperty = {
				styles: {
					position: 'absolute',
					width: '100%',
					height: '100%',
					display: 'none',
				}
			},
			circle = '<div style="position:absolute;bottom:0;left:50%;border-radius:50%;' +
				'width:' + ballWidth + 'px;height:' + ballWidth + 'px;margin:-' + ballWidth / 2 +
				'px 0 0 -' + ballWidth / 2 + 'px;';
		
		if (isArray(colors)) {
			for (; colors.length < total; i++) {
				colors.push(colors[i]);
			}
		} else {
			color = colors;
			colors = [];
			for (; i < total; i++) {
				colors.push(color);
			}
		}
		isBody &&
		_extend(containerProperty.styles, {
			position: 'fixed',
			top: '50%',
			left: '50%',
			zIndex: '1000',
			transform:'translate(-50%,-50%)',
			'-ms-transform':'translate(-50%,-50%)'
		});
		var container = _createSingleElement('div', containerProperty);
		fragment.appendChild(container);
		for (i = 0; i < total; i++) {
			
			wrap = _createSingleElement(
				'div',
				_extend(wrapProperty, {
					inner: circle + 'background:' + colors[i] + ';"/>'
				})
			);
			container.appendChild(wrap);
			elList.push(wrap);
		}
		relativeElement.appendChild(fragment);
		return elList;
	}

	var emptyArr = [];
	var slice = emptyArr.slice;

	var ele1UniformDeg = 20;
	var ele1UniformTime = 200;
	var uniformSpeed = ele1UniformDeg / ele1UniformTime;

	function currying(fn) {
		var args = slice.call(arguments, 1);
		return function () {
			return fn.apply(null, args.concat(slice.call(arguments)));
		};
	}

	function _execUnit(element, beginTime, endTime, beginValue, endValue, timingFn, manipulate) {
		this.ele = element;
		// 开始时间
		this.bT = beginTime;
		// 结束时间
		this.eT = endTime;
		// 执行完的回调
		this.cb = [];
		
		this.mani = manipulate || voidFn;
		this.tFn = timingFn
			? currying(timingFn, beginValue, endValue - beginValue, endTime - beginTime)
			: voidFn;
	}

	_extend(_execUnit.prototype, {
		do: function (currentTime) {
			this.mani(this.tFn(currentTime - this.bT));
		},
		
		pushCallback: function (fn, once, args) {
			this.cb.push({
				fn: fn,
				one: once,
				args: emptyArr.concat(args)
			});
		},
		execCallback: function () {
			var i,
				fn,
				length = this.cb.length;
			
			for (i = 0; i < length; i++) {
				if (this.cb[i].one) {
					fn = this.cb[i].splice(i, 1);
					i--;
				} else {
					fn = this.cb[i].fn;
				}
				fn.apply(this, this.cb[i].args);
			}
		}
	});

	function VerticalList(el, execUnitList) {
		this.ele = el;
		// 现在eUL执行exexUnit的索引
		this.ind = 0;
		// 开始时间
		this.sT = 0;
		
		this.eUL = execUnitList;
		// 暂停时间
		this.pT = 0;
		// 储存开始时间
		this.sTSave = 0;
		this.len = execUnitList.length;
	}

	_extend(VerticalList.prototype, {
		next: function (currentTime) {
			if (this.sT === 0) {
				if (this.pT) {
					this.sT = currentTime - this.pT + this.sTSave;
					this.pT = 0;
				} else {
					this.sT = currentTime;
					this.eUL[0].do(0);
					return;
				}
			}
			var time = currentTime - this.sT;
			if (this.ind < this.len) {
				if (time > this.eUL[this.ind].eT) {
					this.eUL[this.ind].execCallback();
					this.ind++;
				}
				this.eUL[this.ind] && this.eUL[this.ind].do(time);
			}
		},
		addCallback: function (i, fn, once, argsList) {
			
			if (i < this.len) {
				this.eUL[i].pushCallback(fn, once, argsList);
			}
			return this;
		},
		init: function (callback) {
			this.sT = 0;
			this.ind = 0;
			callback && callback.call(this);
		},
		pause: function (time) {
			this.sTSave = this.sT;
			this.sT = 0;
			this.pT = time;
		}
	});

	function linear(b, c, d, t) {
		return c * t / d + b;
	}

	function quadEaseIn(b, c, d, t) {
		return c * (t /= d) * t + b;
	}


	function circEaseOut(b, c, d, t) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}

	function win10Loading(options) {
		var configuration = {
				width: 100,
				ballWidth: 6,
				color: '#000',
				// 小球开始出现的间隔时间
				interval: 150,
				// 小球数量
				total: 5,
				// 默认加入body元素中
				relative: document.body
			},
			levelList;
		
		if (typeof options === 'object') {
			configuration.width = options['width'] || 80;
			configuration.ballWidth = options['ballWidth'] || 3;
			configuration.color = options['color'] || '#000';
			if (options['relative']) {
				if (options['relative'].nodeType === 1) {
					configuration.relative = options['relative'];
				}
				if (typeof options['relative'] === 'string') {
					configuration.relative =
						document.getElementById(options['relative']) || document.body;
				}
			}
		}
		// 根据配置创建元素
		var balls = _create(configuration);
		// 每个小球所占度数
		var ballRangle =
			Math.asin(
				configuration.ballWidth / 2 / (configuration.width / 2 - configuration.ballWidth / 2)
			) * 2 * 90;
		levelList = balls.map(function (el, index) {
			var t1 = index * configuration.interval;
			var v1 = 0;
			var t2 = 1200;
			var v2 = 170 - index * ballRangle;
			var t3 = t2 + (180 - v2) / uniformSpeed + index * 80;
			var v3 = 180 - index * 2;
			var t4 = t3 + 600;
			var v4 = 360;
			var t5 = 3100;
			var v5 = 520 - index * ballRangle;
			var t6 = t5 + (180 - v2) / uniformSpeed + index * 80;
			var v6 = 540 - index * 2;
			var t7 = t6 + 500;
			var v7 = 680;
			
			return new VerticalList(el, [
				new _execUnit(el, 0, t1),
				new _execUnit(el, t1, t2, v1, v2, circEaseOut, manipulation),
				new _execUnit(el, t2, t3, v2, v3, linear, manipulation),
				new _execUnit(el, t3, t4, v3, v4, quadEaseIn, manipulation),
				new _execUnit(el, t4, t5, v4, v5, circEaseOut, manipulation),
				new _execUnit(el, t5, t6, v5, v6, linear, manipulation),
				new _execUnit(el, t6, t7, v6, v7, quadEaseIn, manipulation)
			]);
		});
		
		levelList.forEach(function (verticalList,index) {
			verticalList
				.addCallback(0, function () {
					console.log(index);
					this.ele.style.display = 'block';
				})
				.addCallback(6, function () {
					hidden(this.ele);
				});
		});
		
		var last = levelList[configuration.total - 1];
		last.eUL.push(new _execUnit(last.ele, 0, 5000));
		last.len++;
		function reset() {
			levelList.forEach(function (verticalList) {
				verticalList.init();
			});
		}
		last.addCallback(last.len - 1, function () {
			reset();
			//reset过后在next还会++
			last.ind--;
		});
		return new AnimationLauncher(levelList);
	}

	return win10Loading;

})));
