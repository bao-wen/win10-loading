import start from './start';
import pause from './pause';
import stop from './stop';
import {_extend} from './utils';

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


export default AnimationLauncher;
