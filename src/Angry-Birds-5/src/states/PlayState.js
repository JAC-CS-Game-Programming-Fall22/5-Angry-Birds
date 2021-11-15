import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import Block from "../entities/Block.js";
import Size from "../enums/Size.js";
import Ground from "../entities/Ground.js";
import Pig from "../entities/Pig.js";
import BirdQueue from "../objects/BirdQueue.js";
import Slingshot from "../objects/Slingshot.js";
import Fortress from "../objects/Fortress.js";
import BirdType from "../enums/BirdType.js";
import {
	CANVAS_HEIGHT,
	context,
	engine,
	matter,
	stateMachine,
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
			new Block(startX + Block.DIMENSIONS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(startX + Block.DIMENSIONS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(startX + Block.DIMENSIONS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Large, Block.ANGLE_HORIZONTAL),
		];
		const pigs = [
			new Pig(startX + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height),
		];

		this.birdQueue = new BirdQueue([BirdType.Red, BirdType.Red]);
		this.slingshot = new Slingshot(this.birdQueue);
		this.fortress = new Fortress(blocks, pigs);
		this.ground = new Ground();
	}

	exit() {
		// Remove all Matter bodies from the world before exiting this state.
		Composite.allBodies(world).forEach((body) => Composite.remove(world, body));
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

		this.fortress.update(dt);
		this.slingshot.update();
		this.birdQueue.update();

		this.checkWinOrLose();
	}

	render() {
		this.renderStatistics();
		this.birdQueue.render();
		this.slingshot.render();
		this.fortress.render();
		this.ground.render();
	}

	renderStatistics() {
		context.fillStyle = 'navy';
		context.font = '60px Consolas, Courier';

		context.fillText(`Birds: ${this.birdQueue.birds.length + (this.slingshot.bird === null ? 0 : 1)}`, 50, 100);
		context.fillText(`Blocks: ${this.fortress.blocks.length}`, 50, 190);
		context.fillText(`Pigs: ${this.fortress.pigs.length}`, 50, 280);
		context.fillText(`Bodies: ${Composite.allBodies(world).length - 1}`, 50, 370);
	}

	didWin() {
		return this.fortress.areNoPigsLeft();
	}

	didLose() {
		return this.birdQueue.areNoBirdsLeft() && this.slingshot.isEmpty();
	}

	checkWinOrLose() {
		if (this.didWin()) {
			stateMachine.change(GameStateName.Victory);
		}
		else if (this.didLose()) {
			stateMachine.change(GameStateName.GameOver);
		}
	}
}
