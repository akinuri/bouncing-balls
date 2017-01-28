var Vector = function (x, y) {
	this.x = x;
	this.y = y;
};

Vector.prototype.add = function add(v) {
	this.x += v.x;
	this.y += v.y;
};