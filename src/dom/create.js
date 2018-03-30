import {boxW, boxH, minR} from '../core/var';

function create() {
	var svg,
		elList = [];
	var cDF = document.createDocumentFragment();
	var wrapBoxProperty = {
		styles: {
			position: 'fixed',
			top: '50%',
			left: '50%',
			zIndex: '1000',
			width: boxW + 'px',
			height: boxH + 'px',
		},
	};
	var wrapBox = _createSingleElement('div', wrapBoxProperty);
	
	cDF.appendChild(wrapBox);
	var svgProperty = {
		styles: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			display: 'none',
		},
		inner: '<i style=" display:block;width: 6px;height: 6px;border-radius: 50%;background: #0b97c4"/>',
	};
	
	for (var j = 0; j < 5; j++) {
		svg = _createSingleElement('div', svgProperty);
		svg['win10Loading'] = 'index-' + j;
		wrapBox.appendChild(svg);
		elList.push(svg);
	}
	
	document.body.appendChild(cDF);
	return elList;
}

function _createSingleElement(tag, options) {
	var element = (tag.nodeType && tag) || document.createElement(tag);
	var styles = options.styles;
	for (var key in styles) {
		element.style[key] = styles[key];
	}
	element.innerHTML = options.inner || '';
	return element;
}

export default create;