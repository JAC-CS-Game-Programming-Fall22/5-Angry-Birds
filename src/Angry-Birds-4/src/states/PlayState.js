import State from "../../lib/State.js";
import Block from "../entities/Block.js";
import Size from "../enums/Size.js";
import Ground from "../entities/Ground.js";
import BirdQueue from "../objects/BirdQueue.js";
import Slingshot from "../objects/Slingshot.js";
import Fortress from "../objects/Fortress.js";
import BirdType from "../enums/BirdType.js";
import {
	CANVAS_HEIGHT,
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
		const startX = 1500;

		const blocks = [
			new Block(
				startX + Block.DIMENSIONS[Size.Medium].width * 0.25,
				CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height,
				Size.Medium
			),
			new Block(
				startX + Block.DIMENSIONS[Size.Medium].width * 4.75,
				CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height,
				Size.Medium
			),
			new Block(
				startX + Block.DIMENSIONS[Size.Medium].width * 2.5,
				CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2,
				Size.Large,
				Block.ANGLE_HORIZONTAL
			),
		];

		this.birdQueue = new BirdQueue([BirdType.Red, BirdType.Red]);
		this.slingshot = new Slingshot(this.birdQueue);
		this.fortress = new Fortress(blocks);
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

		this.fortress.update(dt);
		this.slingshot.update(dt);
		this.birdQueue.update();
	}

	render() {
		this.renderStatistics();
		this.birdQueue.render();
		this.fortress.render();
		this.slingshot.render();
		this.ground.render();
	}

	renderStatistics() {
		context.save();
		context.fillStyle = 'navy';
		context.font = '60px Consolas, Courier';
		context.fillText(`Birds: ${this.birdQueue.birds.length + (this.slingshot.bird === null ? 0 : 1)}`, 50, 100);
		context.fillText(`Blocks: ${this.fortress.blocks.length}`, 50, 190);
		context.fillText(`Bodies: ${Composite.allBodies(world).length - 1}`, 50, 280);
		context.restore();
	}
}
