import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import LevelMaker from "../services/LevelMaker.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	keys,
	stateMachine
} from "../globals.js";

export default class VictoryState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to go back to the title screen.
	 */
	constructor() {
		super();
	}

	enter(parameters) {
		this.level = parameters.level;
	}

	update() {
		if (keys.Enter) {
			keys.Enter = false;

			stateMachine.change(GameStateName.Play, {
				level: LevelMaker.createLevel(this.level + 1),
			});
		}
	}

	render() {
		context.save();
		context.font = '300px Consolas, Courier';
		context.fillStyle = 'limegreen';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Victory!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 90);
		context.font = '100px Consolas, Courier';
		context.fillStyle = 'white';
		context.fillText('Press Enter to Continue', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80);
		context.restore();
	}
}
