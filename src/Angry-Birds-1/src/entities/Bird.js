import Circle from "./Circle.js";

export default class Bird extends Circle {
	static RADIUS = 20;

	/**
	 * A bird that will be launched at the pig fortress. The bird is a
	 * dynamic (i.e. non-static) Matter body meaning it is affected by
	 * the world's physics. We've given the bird a high restitution value
	 * so that it is bouncy.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_restitution
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		super(x, y, Bird.RADIUS, 'red', {
			restitution: 0.8,
		});
	}
}
