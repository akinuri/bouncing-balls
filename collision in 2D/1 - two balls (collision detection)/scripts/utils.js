function random() {
	if (arguments.length > 2) {
		return 0;
	}
	switch (arguments.length) {
		case 0:
			return Math.random();
		case 1:
			return Math.round(Math.random() * arguments[0]);
		case 2:
			var min = Math.min(arguments[0], arguments[1]);
			var max = Math.max(arguments[0], arguments[1]);
			return Math.round(min + Math.random() * (max - min));
	}
}

function randomDir(n) {
	if (random(1)) {
		return n;
	}
	return n * -1;
}