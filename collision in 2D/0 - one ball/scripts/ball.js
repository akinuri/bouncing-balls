var Ball = function (r, px, py, vx, vy, fillStyle) {
	this.radius		= r;
	this.position	= new Vector(px, py);
	this.velocity	= new Vector(vx, vy);
	this.color = this.fillStyle = fillStyle || "black";
	this.snap2wall();
};

Ball.prototype.updateBoundingBox = function () {
	this.boundingBox = {
		left	: this.position.x - this.radius,
		right	: this.position.x + this.radius,
		top		: this.position.y - this.radius,
		bottom	: this.position.y + this.radius,
	};
};

Ball.prototype.move = function () {
	this.position.add(this.velocity);
	this.snap2wall();
};

Ball.prototype.snap2wall = function () {
	this.updateBoundingBox();
	if (this.boundingBox.left < container.left) {
		this.position.x = container.left + this.radius;
	}
	if (this.boundingBox.right > container.right) {
		this.position.x = container.right - this.radius;
	}
	if (this.boundingBox.top < container.top) {
		this.position.y = container.top + this.radius;
	}
	if (this.boundingBox.bottom > container.bottom) {
		this.position.y = container.bottom - this.radius;
	}
	this.updateBoundingBox();
};

Ball.prototype.detectWallCollision = function () {
	if (this.boundingBox.left <= container.left || this.boundingBox.right >= container.right) {
		this.velocity.x *= -1;
		this.flash("red");
	}
	if (this.boundingBox.top <= container.top || this.boundingBox.bottom >= container.bottom) {
		this.velocity.y *= -1;
		this.flash("red");
	}
};

Ball.prototype.flash = function (fillStyle) {
	this.fillStyle = fillStyle;
	setTimeout(function() {
		this.fillStyle = this.color;
	}.bind(this), 50);
};

Ball.prototype.draw = function () {
	context.beginPath();
	context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
	context.fillStyle = this.fillStyle;
	context.fill();
};