import Block from "../entities/Block.js";
import Ground from "../entities/Ground.js";
import Pig from "../entities/Pig.js";
import BirdType from "../enums/BirdType.js";
import Size from "../enums/Size.js";
import BirdQueue from "../objects/BirdQueue.js";
import Fortress from "../objects/Fortress.js";
import Level from "../objects/Level.js";
import { CANVAS_HEIGHT } from "../globals.js";

/**
 * Encapsulates all logic to create a level
 * that contains pigs, blocks, and birds.
 */
export default class LevelMaker {
	static START_X = 1500;

	static createLevel(level = 1) {
		switch (level) {
			case 1:
				return LevelMaker.levelOne();
			case 2:
				return LevelMaker.levelTwo();
			default:
				return LevelMaker.levelThree();
		}
	}

	static levelOne() {
		const blocks = [
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Large, Block.ANGLE_HORIZONTAL),
		];

		const pigs = [
			new Pig(LevelMaker.START_X + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height),
		];

		const birdQueue = new BirdQueue([BirdType.Red, BirdType.Red]);

		return new Level(1, new Fortress(blocks, pigs), birdQueue);
	}

	static levelTwo() {
		const blocks = [
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Large, Block.ANGLE_HORIZONTAL),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 3, Size.Large, Block.ANGLE_HORIZONTAL),
		];

		const pigs = [
			new Pig(LevelMaker.START_X + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height),
			new Pig(LevelMaker.START_X + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Pig.RADIUS * 6),
			new Pig(LevelMaker.START_X + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Pig.RADIUS * 12),
		];

		const birdQueue = new BirdQueue([BirdType.Red, BirdType.Red, BirdType.Red, BirdType.Red]);

		return new Level(2, new Fortress(blocks, pigs), birdQueue);
	}

	static levelThree() {
		const blocks = [
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Large, Block.ANGLE_HORIZONTAL),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 2, Size.Medium),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height * 3, Size.Large, Block.ANGLE_HORIZONTAL),
			new Block(LevelMaker.START_X - 100, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Large, Block.ANGLE_RIGHT_DIAGONAL),
			new Block(LevelMaker.START_X + Block.DIMENSIONS[Size.Medium].width * 8, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Block.DIMENSIONS[Size.Medium].height, Size.Large, Block.ANGLE_LEFT_DIAGONAL),
		];

		const pigs = [
			new Pig(LevelMaker.START_X - 30, CANVAS_HEIGHT - Ground.MEASUREMENTS.height),
			new Pig(LevelMaker.START_X + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height),
			new Pig(LevelMaker.START_X + 250, CANVAS_HEIGHT - Ground.MEASUREMENTS.height),
			new Pig(LevelMaker.START_X + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Pig.RADIUS * 6),
			new Pig(LevelMaker.START_X + 110, CANVAS_HEIGHT - Ground.MEASUREMENTS.height - Pig.RADIUS * 12),
		];

		const birdQueue = new BirdQueue([BirdType.Red, BirdType.Red, BirdType.Red, BirdType.Red, BirdType.Red, BirdType.Red]);

		return new Level(3, new Fortress(blocks, pigs), birdQueue);
	}
}
