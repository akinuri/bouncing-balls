var Vector = function (x, y) {
	this.x = x;
	this.y = y;
};

Vector.prototype.add = function add(v) {
	this.x += v.x;
	this.y += v.y;
};

Vector.prototype.magnitude = function add(v) {
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};