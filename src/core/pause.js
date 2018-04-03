

function pause() {
	if (this.mask & 2) {
		this.mask = 5;
		clearTimeout(this.timer);
		var nowTime = new Date().getTime();
		this.levelList.forEach(function (VerticalList) {
			VerticalList.pause(nowTime);
		});
	}
}

export default pause;
