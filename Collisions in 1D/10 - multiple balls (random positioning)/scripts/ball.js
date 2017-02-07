var Ball = function (r, px, py, vx, vy, color) {
    this.radius    = r;
    this.mass      = r;
    this.position  = new Point(px, py);
    this.velocity  = new Vector(vx, vy);
    this.color     = color || "black";
    this.wireframe = false;
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

Ball.prototype.snap2wall = function () {
    if (this.boundingBox.left < container.left) {
        this.position.x = container.left + this.radius;
    }
    if (this.boundingBox.right > container.right) {
        this.position.x = container.right - this.radius;
    }
    this.updateBoundingBox();
};

Ball.prototype.snap2ball = function (ball) {
    var b1_mag = this.velocity.magnitude();
    var b2_mag = ball.velocity.magnitude();
    var intersection = (this.radius + ball.radius) - Math.abs(this.position.x - ball.position.x);
    if (b1_mag != 0 && b2_mag != 0) {
        var min_mag = Math.min(b1_mag, b2_mag);
        var max_mag = Math.max(b1_mag, b2_mag);
        var mag_rat = min_mag / max_mag;
        var min_offset = 0;
        var max_offset = 0;
        if (b1_mag < b2_mag) {
            min_offset = Math.round(intersection / (1 + mag_rat));
            max_offset = intersection - min_offset;
        } else {
            max_offset = Math.round(intersection / (1 + mag_rat));
            min_offset = intersection - max_offset;
        }
        if (min_mag == b1_mag) {
            this.position.x -= min_offset;
            ball.position.x += max_offset;
        }
        else if (min_mag == b2_mag) {
            ball.position.x += min_offset;
            this.position.x -= max_offset;
        }
    }
    else if (b1_mag == 0 || b2_mag == 0) {
        if (b1_mag == 0) {
            ball.position.x += intersection;
        }
        else if (b2_mag == 0) {
            this.position.x -= intersection;
        }
    }
    this.updateBoundingBox();
    ball.updateBoundingBox();
};

Ball.prototype.intersectingWithWall = function () {
    if (this.boundingBox.left < container.left || this.boundingBox.right > container.right) {
        return true;
    }
    return false;
};

Ball.prototype.collidingWithWall = function () {
    if (this.boundingBox.left == container.left || this.boundingBox.right == container.right) {
        return true;
    }
    return false;
};

Ball.prototype.intersectingWith = function (ball) {
    if (this.boundingBox.right > ball.boundingBox.left && this.boundingBox.left < ball.boundingBox.right) {
        return true;
    }
    return false;
};

Ball.prototype.collidingWith = function (ball) {
    if (this.boundingBox.right == ball.boundingBox.left && this.boundingBox.left == ball.boundingBox.right) {
        return true;
    }
    return false;
};


Ball.prototype.draw = function () {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math. PI);
    if (this.wireframe) {
        context.strokeStyle = this.color;
        context.stroke();
    } else {
        context.fillStyle = this.color;
        context.fill();
    }
};

Ball.prototype.resolveCollision = function (ball) {
    var vx1       = (this.velocity.x * (this.mass - ball.mass) + 2 * ball.mass * ball.velocity.x) / (this.mass + ball.mass);
    var vx2       = (ball.velocity.x * (ball.mass - this.mass) + 2 * this.mass * this.velocity.x) / (this.mass + ball.mass);
    this.velocity = new Vector(vx1, 0);
    ball.velocity = new Vector(vx2, 0);
};

function spawnBalls(count, radius) {
    var balls = [];
    cellWidth = Math.floor(canvas.width / count);
    var cellEdgeOffset = 1;
    allowedCellWidth = cellWidth - 2 * cellEdgeOffset;
    if (allowedCellWidth < 2 * radius) {
        throw new Error("There's not enough room for " + count + " balls.");
    }
    cells = [];
    for (var i = 0; i < count; i++) {
        cells.push({
            x1 : i * cellWidth + (radius + 1),
            x2 : (i + 1) * cellWidth - (radius + 1)
        });
    }
    for (var i = 0; i < cells.length; i++) {
        balls.push(new Ball(radius, random(cells[i].x1, cells[i].x2), 25, random(0, 4), 0, randomColor()));
    }
    return balls;
}

function trackCollisions() {
    // wall collisions
    balls.forEach(function(ball) {
        if (ball.intersectingWithWall()) {
            ball.velocity.reverse("x");
            ball.snap2wall();
        }
        else if (ball.collidingWithWall()) {
            ball.velocity.reverse("x");
        }
    });
    // ball collisions
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            if (balls[i].intersectingWith(balls[j])) {
                balls[i].resolveCollision(balls[j]);
                balls[i].snap2ball(balls[j]);
            }
            else if (balls[i].collidingWith(balls[j])) {
                balls[i].resolveCollision(balls[j]);
            }
        }
    }
};