import GameEntity from "./GameEntity.js";
import {
	CANVAS_WIDTH,
	context,
	matter
} from "../globals.js";

export default class Circle extends GameEntity {
	/**
	 * A GameEntity that has a Matter circle as its body.
	 * Both Canvas and Matter use the center of their circles
	 * for the origin so we don't have to worry about offsetting.
	 *
	 * https://brm.io/matter-js/docs/classes/Bodies.html#method_circle
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} radius
	 * @param {object} options
	 */
	constructor(x, y, radius, colour, options) {
		super(matter.Bodies.circle(x, y, radius, options), colour);

		this.radius = radius;
	}

	update(dt) {
if (this.didGoOffScreen()) {
	this.shouldCleanUp = true;
}

		super.update(dt);
	}

	render() {
		context.save();
		context.translate(this.body.position.x, this.body.position.y);
		context.rotate(this.body.angle);

		context.beginPath();
		context.arc(0, 0, this.radius, 0, 2 * Math.PI);
		context.closePath();
		context.fillStyle = this.colour;
		context.fill();
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(this.radius, 0)
		context.closePath();
		context.lineWidth = 5;
		context.stroke();

		context.restore();
	}

didGoOffScreen() {
	return this.body.position.x + this.radius < 0 || this.body.position.x - this.radius > CANVAS_WIDTH;
}
}
