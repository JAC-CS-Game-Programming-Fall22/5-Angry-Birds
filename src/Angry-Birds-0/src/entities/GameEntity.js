import {
	matter,
	world
} from "../globals.js";

const {
	Composite,
} = matter;

export default class GameEntity {
	/**
	 * The base class that all entities in the game should extend.
	 *
	 * @param {object} body A Matter.js body.
	 */
	constructor(body, colour) {
		this.body = body;
		this.colour = colour;
		this.shouldCleanUp = false;

		Composite.add(world, body);
	}
}
