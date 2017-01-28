var Ball = function (r, px, py, vx, vy, fillStyle) {
	this.radius		= r;
	this.position	= new Vector(px, py);
	this.velocity	= new Vector(vx, vy);
	this.fillStyle	= fillStyle || "black";
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
	this.updateBoundingBox();
};

Ball.prototype.detectWallCollision = function () {
	if (this.boundingBox.left <= container.left || this.boundingBox.right >= container.right) {
		this.velocity.x *= -1;
		this.flash("red");
	}
};

Ball.prototype.flash = function (fillStyle) {
	var initialFill = this.fillStyle;
	this.fillStyle = fillStyle;
	setTimeout(function(initialFill) {
		this.fillStyle = initialFill;
	}.bind(this, initialFill), 50);
};

Ball.prototype.draw = function () {
	context.beginPath();
	context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
	context.fillStyle = this.fillStyle;
	context.fill();
};