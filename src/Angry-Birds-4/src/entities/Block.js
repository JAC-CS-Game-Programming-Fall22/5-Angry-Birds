import BodyType from "../enums/BodyType.js";
import Size from "../enums/Size.js";
import Rectangle from "./Rectangle.js";

export default class Block extends Rectangle {
	static ANGLE_VERTICAL = 0;
	static ANGLE_HORIZONTAL = Math.PI / 2;
	static ANGLE_RIGHT_DIAGONAL = Math.PI / 4;
	static ANGLE_LEFT_DIAGONAL = 3 * Math.PI / 4;
	static DIMENSIONS = {
		[Size.Small]: { width: 35, height: 70 },
		[Size.Medium]: { width: 35, height: 110 },
		[Size.Large]: { width: 35, height: 220 },
	};

	/**
	 * One block that is used to build a pig fortress. The block
	 * is a dynamic (i.e. non-static) Matter body meaning it is affected by the
	 * world's physics. We've set the friction high to mimic a
	 * wood block that is not usually slippery.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} size The size of the block using the Size enum.
	 * @param {number} angle The angle of the block in radians.
	 */
	constructor(x, y, size, angle = Block.ANGLE_VERTICAL) {
		super(x, y, Block.DIMENSIONS[size].width, Block.DIMENSIONS[size].height, 'saddlebrown', {
			angle: angle,
			label: BodyType.Block,
			isStatic: false,
			frictionStatic: 1,
			friction: 1,
		});

		this.size = size;
	}
}
