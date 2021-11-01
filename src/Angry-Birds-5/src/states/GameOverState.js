import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	keys,
	stateMachine
} from "../globals.js";

export default class GameOverState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to go back to level 1.
	 */
	constructor() {
		super();
	}

	update() {
		if (keys.Enter) {
			keys.Enter = false;

			stateMachine.change(GameStateName.Play);
		}
	}

	render() {
		context.save();
		context.font = '300px Consolas, Courier';
		context.fillStyle = 'crimson';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 90);
		context.font = '100px Consolas, Courier';
		context.fillStyle = 'white';
		context.fillText('Press Enter to Continue', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80);
		context.restore();
	}
}
