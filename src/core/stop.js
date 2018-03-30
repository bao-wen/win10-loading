import {hidden} from '../dom/manipulation';
import {_arrTraverse} from './utils';

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

export default stop;
