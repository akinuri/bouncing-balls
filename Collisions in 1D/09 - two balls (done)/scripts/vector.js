/* ==================== Vector ==================== */

var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.reverse = function reverse(com) {
    this[com] *= -1;
};

Vector.prototype.magnitude = function magnitude() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/* ==================== Point ==================== */

var Point = function Point(x, y) {
    this.x = x;
    this.y = y;
};

Point.prototype.add = function add(vector) {
    this.x += vector.x;
    this.y += vector.y;
};