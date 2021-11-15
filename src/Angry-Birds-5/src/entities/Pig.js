import BodyType from "../enums/BodyType.js";
import Circle from "./Circle.js";

export default class Pig extends Circle {
	static RADIUS = 20;

	/**
	 * A pig that sits smugly in its fortress.
	 * The pig is a dynamic (i.e. non-static) Matter body meaning it is affected
	 * by the world's physics. We've set the density to a value
	 * higher than the block's density so that the pig can knock
	 * blocks over. We've also given the pig a medium restitution
	 * value so that it is somewhat bouncy.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_density
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_restitution
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_collisionFilter
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		super(x, y, Pig.RADIUS, 'dodgerblue', {
			label: BodyType.Pig,
			density: 0.0015,
			restitution: 0.5,
		});
	}
}
