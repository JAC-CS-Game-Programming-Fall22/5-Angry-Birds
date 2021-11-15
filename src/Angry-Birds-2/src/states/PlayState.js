import State from "../../lib/State.js";
import Ground from "../entities/Ground.js";
import Slingshot from "../objects/Slingshot.js";
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
		this.slingshot = new Slingshot();
		this.ground = new Ground();
	}

	update(dt) {
		/**
		 * Update the Matter world one step/frame. By calling it here,
		 * we can be sure that the Matter world will be updated at the
		 * same rate as our canvas animation.
		 *
		 * @see https://brm.io/matter-js/docs/classes/Engine.html#method_update
		 */
		Engine.update(engine);

		this.slingshot.update(dt);
	}

	render() {
		this.renderStatistics();
		this.slingshot.render();
		this.ground.render();
	}

	renderStatistics() {
		context.save();
		context.fillStyle = 'navy';
		context.font = '60px Consolas, Courier';
		context.fillText(`Birds: ${this.slingshot.bird === null ? 0 : 1}`, 50, 100);
		context.fillText(`Bodies: ${Composite.allBodies(world).length - 1}`, 50, 190);
		context.restore();
	}
}
