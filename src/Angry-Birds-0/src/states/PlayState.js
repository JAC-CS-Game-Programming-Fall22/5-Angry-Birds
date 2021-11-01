import State from "../../lib/State.js";
import Ground from "../entities/Ground.js";
import {
	context,
	engine,
	matter,
	world
} from "../globals.js";

const {
	Composite,
	Engine,
} = matter;

export default class PlayState extends State {
	constructor() {
		super();
	}

	enter() {
		this.ground = new Ground();
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
	}

	render() {
		this.renderStatistics();
		this.ground.render();
	}

	renderStatistics() {
		context.save();
		context.fillStyle = 'navy';
		context.font = '60px Consolas, Courier';
		context.fillText(`Bodies: ${Composite.allBodies(world).length}`, 50, 100);
		context.restore();
	}
}
