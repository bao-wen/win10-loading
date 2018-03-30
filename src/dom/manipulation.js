function manipulation(el, attrs) {
	var attr, prop;
	for (attr in attrs) {
		
		for (prop in attrs[attr]) {
			el[attr][prop] = attrs[attr][prop];
			
		}
	}
	
}

function hidden(ele) {
	ele.style.display = 'none';
}

export {manipulation,hidden} ;