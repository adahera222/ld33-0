PointObject.prototype = new GameObject();
PointObject.prototype.constructor = GameObject;

function PointObject(position, velocity, radius) {
	GameObject.call(this);

	this.collisionType = COLLISION_TYPE_CIRCLE;

    this.position = position;
    this.previousPosition = position;

    this.velocity = velocity;
    this.previousVelocity = velocity;

    this.radius = radius;
}

PointObject.prototype.update = function(deltaTime, scene) {
	if (this.velocity != null && (this.velocity.x != 0 || this.velocity.y != 0)) {
		this.previousPosition = this.position;
		this.previousVelocity = this.velocity;

		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;

		this.didMove = true;
	}
	else {
		this.didMove = false;
	}
};

PointObject.prototype.draw = function(context) {
	var image = this.getImage();

	if (image != null) {
		context.drawImage(image, 0, 0, image.width, image.height, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
	}
	else {
		context.beginPath();

		context.fillStyle = "#0a0";
		context.strokeStyle = "fff";

		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		context.fill();
		context.stroke();
	}
};

//Specific point objects should override this with the image they want to use
PointObject.prototype.getImage = function() {
	return null;
}

PointObject.prototype.collide = function(collisionObject, collisionPoint) {
	var originalSpeed = this.previousVelocity.distance();
	var newDir = new Vector(collisionObject.previousVelocity.x, collisionObject.previousVelocity.y);
	newDir.normalize();

	newDir.x *= originalSpeed;
	newDir.y *= originalSpeed;

	this.velocity = newDir;
}




