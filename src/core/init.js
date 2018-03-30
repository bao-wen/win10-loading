import create from '../dom/create';
import VerticalList from './VerticalList';
import ExecUnit from './ExecUnit';
import {hidden} from '../dom/manipulation';
import {_arrTraverse} from './utils';

function init(options) {
	var elList = create();
	var length = elList.length;
	var levelQueue = elList.map(function (ele, index) {
		return new VerticalList(ele, index, index * 150);
		
	});
	
	_arrTraverse(levelQueue, function (verticalList) {
		verticalList.addCallback(0, function () {
			this.ele.style.display = 'block';
			
		}).addCallback(6, function () {
			hidden(this.ele);
		});
	});
	var last = levelQueue[length - 1];
	last.fxList.push(new ExecUnit(last.ele, 0, 5000));
	last.length++;
	
	function reset() {
		
		_arrTraverse(levelQueue, function (verticalList) {
			verticalList.init();
		});
		
		
	}
	
	last.addCallback(last.length - 1, function () {
		reset();
		last.index--;
	});
	this.levelQueue = levelQueue;
	this.length = length;
	this.stateMask = 1;
}

export default init;
