import ExecUnit from './ExecUnit';
import Tween from './tween';
import {
	ballRangle,
	uniformSpeed
} from './var';
function VerticalList(el, index, delay) {
	var t1 = delay || 0;
	var v1 = 0;
	var t2 = 1200;

	var v2 = 170 - index * ballRangle;
	var t3 = t2 + (180 - v2) / uniformSpeed+index*80;
	// var t3 = t2 + 20 / uniformSpeed;
	var v3 = 180-index*2;
	var t4=t3+600;
	var v4=360;
	var t5 = 3100;
	var v5 = 520 - index * ballRangle;
	var t6 = t5 + (180 - v2) / uniformSpeed+index*80;
	var v6 = 540-index*2;
	var t7 = t6 + 500;
	var v7 = 680;
	this.ele = el;
	this.index = 0;
	this.startTime = 0;
	this.fxList = [
		new ExecUnit(el, 0, t1),
		new ExecUnit(el, t1, t2, v1, v2, Tween.Circ.easeOut),
		new ExecUnit(el, t2, t3, v2, v3, Tween.Linear),
		new ExecUnit(el, t3, t4, v3, v4, Tween.Quad.easeIn),
		new ExecUnit(el, t4, t5, v4, v5, Tween.Circ.easeOut),
		new ExecUnit(el, t5, t6, v5, v6, Tween.Linear),
		new ExecUnit(el, t6, t7, v6, v7, Tween.Quad.easeIn),
	
	];
	this.length = this.fxList.length;
	this.pauseStartTime = 0;
	this.startTimeSave = 0;
	
}
VerticalList.prototype.next = function (currentTime) {
	if (this.startTime === 0) {
		if (this.pauseStartTime) {
			this.startTime = currentTime - this.pauseStartTime + this.startTimeSave;
			this.pauseStartTime = 0;
		} else {
			this.startTime = currentTime;
			this.fxList[0].exec(0);
			return;
		}
	}
	var time = currentTime - this.startTime;
	if (this.index < this.length) {
		if (time > this.fxList[this.index].endT) {
			this.fxList[this.index].execCallback();
			this.index++;
		}
		this.fxList[this.index] && this.fxList[this.index].exec(time);
	}
};
VerticalList.prototype.addCallback = function (index, fn, once, argsList) {
	if (index < this.length) {
		this.fxList[index].addCallback(fn, once, argsList);
	}
	return this;
};
VerticalList.prototype.init = function (callback) {
	this.startTime = 0;
	this.index = 0;
	callback && callback.call(this);
};
VerticalList.prototype.pause = function (time) {
	this.startTimeSave = this.startTime;
	this.startTime = 0;
	this.pauseStartTime = time;
};

export default VerticalList;