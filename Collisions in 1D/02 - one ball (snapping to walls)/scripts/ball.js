var Ball = function (r, px, py, vx, vy, color) {
    this.radius    = r;
    this.position  = new Point(px, py);
    this.velocity  = new Vector(vx, vy);
    this.color     = color || "black";
    this.wireframe = true;
};

Ball.prototype.updateBoundingBox = function () {
    this.boundingBox = {
        left    : this.position.x - this.radius,
        right   : this.position.x + this.radius,
        top     : this.position.y - this.radius,
        bottom  : this.position.y + this.radius,
    };
};

Ball.prototype.snap2wall = function () {
    if (this.boundingBox.left < container.left) {
        this.position.x = container.left + this.radius;
    }
    if (this.boundingBox.right > container.right) {
        this.position.x = container.right - this.radius;
    }
    this.updateBoundingBox();
};

Ball.prototype.move = function () {
    this.position.add(this.velocity);
    this.updateBoundingBox();
    // after every move, we're checking if the ball is intersecting with the wall
    // and if it is, we change the position of the ball, move it back inside
    // so that it touches the wall
    // if there's a collising, which snapping to a wall indicates so
    // it will happen after the ball is touching the wall
    this.snap2wall();
};

Ball.prototype.detectWallCollision = function () {
    if (this.boundingBox.left <= container.left || this.boundingBox.right >= container.right) {
        this.velocity.reverse("x");
    }
};

Ball.prototype.draw = function () {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    if (this.wireframe) {
        context.strokeStyle = this.color;
        context.stroke();
    } else {
        context.fillStyle = this.color;
        context.fill();
    }
};