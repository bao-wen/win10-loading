function _arrTraverse(arr, fn, Re) {
	var newArr = [], i, len, re;
	if (isArray(arr)) {
		len = arr.length;
		for (i = 0; i < len; i++) {
			re = fn.call(null, arr[i], i, arr);
			newArr.push(re);
		}
		if (Re) {
			return newArr;
		}
	}
}


function isArray(arr) {
	return Object.prototype.toString.call(arr) == '[object Array]';
}

function _extend(target, obj) {
	for (var key in obj) {
		target[key] = obj[key];
	}
}

export {isArray, _arrTraverse,_extend};