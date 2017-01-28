var Ball = function (r, px, py, vx, vy, fillStyle) {
	this.radius		= r;
	this.mass		= r;
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

Ball.detectCollisions = function () {
	var balls = Array.from(arguments);
	balls.forEach(function(ball) {
		ball.detectWallCollision();
	});
	for (var i = 0; i < balls.length; i++) {
		for (var j = i + 1; j < balls.length; j++) {
			if (balls[i].colliding(balls[j])) {
				balls[i].resoveCollision(balls[j]);
				balls[i].flash("lime");
				balls[j].flash("lime");
			}
		}
	}
};

Ball.prototype.resoveCollision = function (otherBall) {
	var v1 = (this.velocity.x * (this.mass - otherBall.mass) + 2 * otherBall.mass * otherBall.velocity.x) / (this.mass + otherBall.mass);
	var v2 = (otherBall.velocity.x * (otherBall.mass - this.mass) + 2 * this.mass * this.velocity.x) / (this.mass + otherBall.mass);
	this.velocity = new Vector(v1, 0);
	otherBall.velocity = new Vector(v2, 0);
};

Ball.prototype.colliding = function (ball) {
	if (this.boundingBox.right >= ball.boundingBox.left && this.boundingBox.left <= ball.boundingBox.right) {
		return true;
	}
	return false;
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
	context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math. PI);
	context.fillStyle = this.fillStyle;
	context.fill();
};