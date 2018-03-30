import init from './core/init';
import stop from './core/stop';
import pause from './core/pause';

import start from './core/start';
import support from './core/support';

function win10Loading(options) {
	return new win10Loading.fn.init(options);
}
win10Loading.fn = win10Loading.prototype = init.prototype;
win10Loading.fn.constructor = win10Loading;
win10Loading.fn.init = init;
win10Loading.fn.start = start;
win10Loading.fn.pause = pause;
win10Loading.fn.stop = stop;
win10Loading.fn.support = support;



export default  win10Loading;