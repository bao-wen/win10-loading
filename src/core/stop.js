
import {hidden} from './utils';

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

export default stop;
