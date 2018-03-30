import {_arrTraverse} from './utils';

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


export default pause;