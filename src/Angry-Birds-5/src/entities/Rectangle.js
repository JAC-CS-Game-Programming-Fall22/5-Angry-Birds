import GameEntity from "./GameEntity.js";
import {
	CANVAS_WIDTH,
	context,
	matter
} from "../globals.js";

export default class Rectangle extends GameEntity {
	/**
	 * A GameEntity that has a Matter rectangle as its body.
	 * Canvas origin is top-left, Matter origin is center.
	 * We'll work in top-left coordinates as usual but
	 * offset them when giving/retrieving to/from Matter.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Bodies.html#method_rectangle
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {object} options
	 */
	constructor(x, y, width, height, colour, options) {
		super(matter.Bodies.rectangle(
			x + width / 2,
			y + height / 2,
			width,
			height,
			options
		), colour);

		this.width = width;
		this.height = height;
		this.renderOffset = { x: -this.width / 2, y: -this.height / 2 };
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

		context.lineWidth = 5;
		context.rect(this.renderOffset.x, this.renderOffset.y, this.width, this.height);
		context.fillStyle = this.colour;
		context.fill();

		context.restore();
	}

	didGoOffScreen() {
		return this.body.position.x + this.height / 2 < 0 || this.body.position.x - this.height / 2 > CANVAS_WIDTH;
	}
}
