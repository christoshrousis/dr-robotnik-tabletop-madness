import {
	directions,
	validInstructions,
	isValidInstruction,
	isPlaceInstruction,
	getX,
	getY,
	getDirection
} from "../lib";

it(`should follow all cardinal points.`, () => {
	expect(directions).toContain("NORTH");
	expect(directions).toContain("EAST");
	expect(directions).toContain("SOUTH");
	expect(directions).toContain("WEST");
});

it(`should order directions as robot rotational logic relies on it.`, () => {
	expect(directions.indexOf("NORTH")).toBe(0);
	expect(directions.indexOf("EAST")).toBe(1);
	expect(directions.indexOf("SOUTH")).toBe(2);
	expect(directions.indexOf("WEST")).toBe(3);
});

describe(`ability to identify valid instructions from quasi ones.`, () => {
	expect(validInstructions).toBeInstanceOf(RegExp);

	it(`should reject quasi ones.`, () => {
		expect(isValidInstruction("PLOCE")).toBeFalsy();
		expect(isValidInstruction("PLACE 1 1 NORTH")).toBeFalsy();
		expect(isValidInstruction("MIVE")).toBeFalsy();
		expect(isValidInstruction("LUFT")).toBeFalsy();
		expect(isValidInstruction("REPIRT")).toBeFalsy();
		expect(isValidInstruction("RAGHT")).toBeFalsy();
		expect(isValidInstruction("RIGHT LEFT")).toBeFalsy();
		expect(isValidInstruction("PLACE X,Y,NORTH")).toBeFalsy();
		expect(isValidInstruction("PLACE 0,0,NORTHA")).toBeFalsy();
		expect(isValidInstruction("APLACE 0,0,NORTH")).toBeFalsy();
		expect(isValidInstruction("PLACE0,0,NORTH")).toBeFalsy();
	});
	it(`should accept valid ones.`, () => {
		expect(isValidInstruction("MOVE")).toBeTruthy();
		expect(isValidInstruction("LEFT")).toBeTruthy();
		expect(isValidInstruction("RIGHT")).toBeTruthy();
		expect(isValidInstruction("REPORT")).toBeTruthy();
		directions.forEach(direction => {
			for (let x = 0; x < 10; x++) {
				for (let y = 0; y < 10; y++) {
					expect(
						isValidInstruction(`PLACE ${x},${y},${direction}`)
					).toBeTruthy();
				}
			}
		});
	});
});

it(`should be able to identify a PLACE instruction specifically.`, () => {
	expect(isPlaceInstruction("place")).toBeFalsy();
	directions.forEach(direction => {
		expect(isPlaceInstruction(direction)).toBeFalsy();
	});
	expect(isPlaceInstruction("PLACE")).toBeTruthy();
});

it(`should be able to extract information from PLACE instruction.`, () => {
	directions.forEach(direction => {
		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 10; y++) {
				expect(getX(`PLACE ${x},${y},${direction}`)).toBe(x);
				expect(getY(`PLACE ${x},${y},${direction}`)).toBe(y);
				expect(getDirection(`PLACE ${x},${y},${direction}`)).toBe(direction);
			}
		}
	});
});
