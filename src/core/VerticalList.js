import {_extend} from './utils';

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
		console.log('fff');
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

export default VerticalList;
