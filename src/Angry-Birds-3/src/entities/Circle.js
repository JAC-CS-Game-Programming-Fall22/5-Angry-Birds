import GameEntity from "./GameEntity.js";
import Ground from "./Ground.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	matter
} from "../globals.js";

export default class Circle extends GameEntity {
	static ANGULAR_SPEED_MINIMUM = 0.00001;
	static SPEED_MINIMUM = 0.3;

	/**
	 * A GameEntity that has a Matter circle as its body.
	 * Both Canvas and Matter use the center of their circles
	 * for the origin so we don't have to worry about offsetting.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Bodies.html#method_circle
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

	didStop() {
		return this.body.angularSpeed < Circle.ANGULAR_SPEED_MINIMUM && this.body.speed < Circle.SPEED_MINIMUM;
	}

	didGoOffScreen() {
		return this.body.position.x + this.radius < 0 || this.body.position.x - this.radius > CANVAS_WIDTH;
	}
}
