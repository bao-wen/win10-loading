import AnimationLauncher from './core/animationLauncher';
import _create from './core/create';
import _execUnit from './core/execUnit';
import VerticalList from './core/VerticalList';
import {circEaseOut, linear, quadEaseIn} from './core/tween';
import {uniformSpeed} from './core/var';
import {hidden, manipulation} from './core/utils';

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

export default win10Loading;
