import {slice} from './var';

function currying(fn) {
	var args = slice.call(arguments, 1);
	return function () {
		return fn.apply(null, args.concat(slice.call(arguments)));
	};
}

export default currying;
