import currying from './currying';
import {_extend, voidFn} from './utils';
import {emptyArr} from './var';

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

export default _execUnit;
