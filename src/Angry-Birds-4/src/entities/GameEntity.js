import {
	matter,
	world
} from "../globals.js";

const {
	Bodies,
	Composite,
} = matter;

export default class GameEntity {
	static DAMAGE_THRESHOLD_SCALAR = 15;

	/**
	 * The base class that all entities in the game should extend.
	 *
	 * @param {object} body A Matter.js body.
	 */
	constructor(body, colour) {
		this.body = body;
		this.colour = colour;
		this.shouldCleanUp = false;
		this.body.entity = this;
		this.body.damageThreshold = this.body.mass * GameEntity.DAMAGE_THRESHOLD_SCALAR;

		Composite.add(world, body);
	}

	update(dt) {
		if (this.shouldCleanUp) {
			Composite.remove(world, this.body);
		}
	}

	/**
	 * Utility to clone a body based on a set of vertices.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Bodies.html#method_fromVertices
	 *
	 * @param {object} body A Matter.js body.
	 * @returns A cloned Matter.js body.
	 */
	static clone(body) {
		return Bodies.fromVertices(body.position.x, body.position.y, body.vertices, {
			collisionFilter: body.collisionFilter,
			render: body.render,
			plugin: body.plugin,
			label: body.label,
			friction: body.friction,
			restitution: body.restitution,
			angle: body.angle,
			slop: body.slop,
			isStatic: body.isStatic,
			density: body.density,
			mass: body.mass,
			isSensor: body.isSensor
		});
	}

	/**
	 * Utility to check if a body is of a given type.
	 *
	 * @param {object} body A Matter.js body.
	 * @param {string} type Uses an enum from the enums/ folder.
	 * @returns Whether the body is of the given type.
	 */
	static isBodyOfType(body, type) {
		return body.label === type;
	}
}
