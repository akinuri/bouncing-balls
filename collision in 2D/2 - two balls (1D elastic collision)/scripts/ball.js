var Ball = function (r, px, py, vx, vy, fillStyle) {
	this.radius	  = this.mass = r;
	this.position = new Vector(px, py);
	this.velocity = new Vector(vx, vy);
	this.flashed  = null;
	this.color	  = this.fillStyle = fillStyle || "black";
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
	var x1 = (this.velocity.x * (this.mass - otherBall.mass) + 2 * otherBall.mass * otherBall.velocity.x) / (this.mass + otherBall.mass);
	var y1 = (this.velocity.y * (this.mass - otherBall.mass) + 2 * otherBall.mass * otherBall.velocity.y) / (this.mass + otherBall.mass);
	
	var x2 = (otherBall.velocity.x * (otherBall.mass - this.mass) + 2 * this.mass * this.velocity.x) / (this.mass + otherBall.mass);
	var y2 = (otherBall.velocity.y * (otherBall.mass - this.mass) + 2 * this.mass * this.velocity.y) / (this.mass + otherBall.mass);
	
	this.velocity = new Vector(x1, y1);
	otherBall.velocity = new Vector(x2, y2);
};

Ball.prototype.colliding = function (otherBall) {
	// bounding boxes are colliding
	if (this.boundingBox.right > otherBall.boundingBox.left &&
		this.boundingBox.left < otherBall.boundingBox.right &&
		this.boundingBox.top < otherBall.boundingBox.bottom &&
		this.boundingBox.bottom > otherBall.boundingBox.top) {
		
		var a = this.position.x - otherBall.position.x;
		var b = this.position.y - otherBall.position.y;
		var c = Math.sqrt(a*a + b*b);
		
		// balls are colliding
		if (c <= this.radius + otherBall.radius) {
			return true;
		}
		return false;
	}
	return false;
};

Ball.prototype.flash = function (fillStyle) {
	this.fillStyle = fillStyle;
	clearTimeout(this.flashed);
	this.flashed = setTimeout(function() {
		this.fillStyle = this.color;
	}.bind(this), 50);
};

Ball.prototype.draw = function () {
	context.beginPath();
	context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
	context.fillStyle = this.fillStyle;
	context.fill();
};