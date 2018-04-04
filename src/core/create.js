import {_createSingleElement, _extend, isArray,} from './utils';


function _create(options) {
	var relativeElement = options.relative;
	var isBody = relativeElement.nodeName === 'BODY',
		width = options.width,
		ballWidth = options.ballWidth,
		wrap,
		i = 0,
		color,
		total = options.total,
		elList = [],
		fragment = document.createDocumentFragment(),
		colors = options.color,
		containerProperty = {
			styles: {
				position: 'relative',
				width: width + 'px',
				height: width + 'px'
			}
		},
		wrapProperty = {
			styles: {
				position: 'absolute',
				width: '100%',
				height: '100%',
				display: 'none',
			}
		},
		circle = '<div style="position:absolute;bottom:0;left:50%;border-radius:50%;' +
			'width:' + ballWidth + 'px;height:' + ballWidth + 'px;margin:-' + ballWidth / 2 +
			'px 0 0 -' + ballWidth / 2 + 'px;';
	
	if (isArray(colors)) {
		for (; colors.length < total; i++) {
			colors.push(colors[i]);
		}
	} else {
		color = colors;
		colors = [];
		for (; i < total; i++) {
			colors.push(color);
		}
	}
	isBody &&
	_extend(containerProperty.styles, {
		position: 'fixed',
		top: '50%',
		left: '50%',
		zIndex: '1000',
		transform:'translate(-50%,-50%)',
		'-ms-transform':'translate(-50%,-50%)'
	});
	var container = _createSingleElement('div', containerProperty);
	fragment.appendChild(container);
	for (i = 0; i < total; i++) {
		
		wrap = _createSingleElement(
			'div',
			_extend(wrapProperty, {
				inner: circle + 'background:' + colors[i] + ';"/>'
			})
		);
		container.appendChild(wrap);
		elList.push(wrap);
	}
	relativeElement.appendChild(fragment);
	return elList;
}

export default _create;
