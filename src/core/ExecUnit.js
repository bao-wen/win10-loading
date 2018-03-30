import currying from './currying';
import {_extend} from './utils';
import {emptyArr} from './var';

function _execUnit(ele, beginTime, endTime, beginValue, endValue, timingFn, manipulation) {
	this.el = ele;
	this.bT = beginTime;
	this.eT = endTime;
	this.cb = [];
	this.ma = manipulation;
	this.tFn = timingFn ?
		currying(timingFn, beginValue, endValue - beginValue, endTime - beginTime) : function () {
			return 0;
		};
}


_extend(_execUnit.prototype, {
	do: function (currentTime) {
		this.ma(this.tFn(currentTime - this.bT));
		
	},
	
	addCb: function (fn, once, args) {
		this.cb.push({
			fn: fn,
			one: once,
			args: emptyArr.concat(args),
		});
	},
	execCb: function () {
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
	},
});


export default _execUnit;