import State from "../../lib/State.js";
import Bird from "../entities/Bird.js";
import Ground from "../entities/Ground.js";
import {
	canvas,
	CANVAS_WIDTH,
	context,
	engine,
	keys,
	matter,
	world
} from "../globals.js";

const {
	Composite,
	Engine,
	Mouse,
	MouseConstraint,
} = matter;

export default class PlayState extends State {
	constructor() {
		super();
	}

	enter() {
		this.birds = [new Bird(CANVAS_WIDTH / 2 - Bird.RADIUS, 0)];
		this.ground = new Ground();

		/**
		 * To implement mouse interaction, Matter provides a dedicated mechanism
		 * to apply a Constraint to the mouse location. Mouse constraints are used
		 * for allowing user interaction, providing the ability to move bodies via
		 * the mouse or touch.
		 *
		 * https://brm.io/matter-js/docs/classes/MouseConstraint.html
		 */
		Composite.add(world, MouseConstraint.create(engine, {
			mouse: Mouse.create(canvas),
		}));
	}

	update(dt) {
		/**
		 * Update the Matter world one step/frame. By calling it here,
		 * we can be sure that the Matter world will be updated at the
		 * same rate as our canvas animation.
		 *
		 * https://brm.io/matter-js/docs/classes/Engine.html#method_update
		 */
		Engine.update(engine);

		if (keys.Enter) {
			keys.Enter = false;

			this.birds.push(new Bird(CANVAS_WIDTH / 2 - Bird.RADIUS, 0));
		}

		this.birds.forEach((bird) => bird.update(dt));
		this.birds = this.birds.filter((bird) => !bird.shouldCleanUp);
	}

	render() {
		this.renderStatistics();
		this.birds.forEach((bird) => bird.render());
		this.ground.render();
	}

	renderStatistics() {
		context.save();
		context.fillStyle = 'navy';
		context.font = '60px Consolas, Courier';
		context.fillText(`Birds:  ${this.birds.length}`, 50, 100);
		context.fillText(`Bodies: ${Composite.allBodies(world).length - 1}`, 50, 190);
		context.restore();
	}
}
