
var vendor = (function () {
	var elementStyle = document.createElement('div').style;
	var transformNames = [
		'webkitTransform', 'MozTransform', 'OTransform',
		'msTransform',
		'transform'];
	var length = transformNames.length;
	while (length--) {
		if (elementStyle[transformNames[length]] !== undefined) {
			return transformNames[length];
		}
	}
	
})();

function isArray(arr) {
	return Object.prototype.toString.call(arr) == '[object Array]';
}

function _extend(target, obj) {
	for (var key in obj) {
		target[key] = obj[key];
	}
	return target;
}

function _createSingleElement(tag, options) {
	var element = document.createElement(tag);
	
	var styles = options.styles;
	for (var key in styles) {
		element.style[key] = styles[key];
	}
	element.innerHTML = options.inner || '';
	return element;
}

function hidden(ele) {
	ele.style.display = 'none';
}

function manipulation(value) {
	this.ele.style[vendor] = 'rotate(' + value + 'deg)';
}

function voidFn() {

}

export {voidFn, isArray, _extend, _createSingleElement, hidden, manipulation};
