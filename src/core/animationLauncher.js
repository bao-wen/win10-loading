import start from './start';
import pause from './pause';
import support from './support';
import stop from './stop';
import {_extend} from './utils';


function AnimationLauncher(levelQueue) {
	this.levelQueue = levelQueue;
	this.length = levelQueue.length;
	this.mask = 1;
}


_extend(AnimationLauncher.prototype, {
	start: start,
	pause: pause,
	stop: stop,
	support: support
});

export default AnimationLauncher;