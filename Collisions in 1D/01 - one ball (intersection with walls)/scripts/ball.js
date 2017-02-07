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

Ball.prototype.move = function () {
    this.position.add(this.velocity);
    this.updateBoundingBox();
};

Ball.prototype.detectWallCollision = function () {
    // at the moment of collision, the ball might not be actually touching the wall, intersecting with it instead
    // before calculating the wall collision, we need to make sure the ball touches the wall
    // fps is lowered to make this intersection problem noticable
    // proceed to the next example to see it fixed
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