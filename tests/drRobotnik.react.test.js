import DrRobotnik from "../commands";

it("has some defaults.", () => {
	const defaultsDoctor = new DrRobotnik();
	expect(defaultsDoctor.state).toStrictEqual({
		query: "",
		instructions: [],
		acceptInstructions: true
	});
	expect(defaultsDoctor.robot).toStrictEqual({
		isOnTableTop: false,
		x: -1,
		y: -1,
		direction: "NORTH"
	});
	expect(defaultsDoctor.tableTop).toStrictEqual({
		x: 4,
		y: 4
	});
	expect(typeof defaultsDoctor.readInstructions === "function").toBeTruthy();
	expect(typeof defaultsDoctor.onChange === "function").toBeTruthy();
	expect(typeof defaultsDoctor.onSubmit === "function").toBeTruthy();
});

const doctor = new DrRobotnik();
beforeEach(() => {
	doctor.state = {
		query: "",
		instructions: [],
		acceptInstructions: true
	};
	doctor.robot = {
		isOnTableTop: false,
		x: -1,
		y: -1,
		direction: "NORTH"
	};
	doctor.tableTop = {
		x: 4,
		y: 4
	};
});

describe("Dr.Robotnik is expected to behave as per the provided examples.", () => {
	it("adheres to the first example.", () => {
		doctor.state.instructions = ["PLACE 0,0,NORTH", "MOVE", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.x).toBe(0);
		expect(doctor.robot.y).toBe(1);
		expect(doctor.robot.direction).toBe("NORTH");
	});

	it("adheres to the second example.", () => {
		doctor.state.instructions = ["PLACE 0,0,NORTH", "LEFT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.x).toBe(0);
		expect(doctor.robot.y).toBe(0);
		expect(doctor.robot.direction).toBe("WEST");
	});

	it("adheres to the third example.", () => {
		doctor.state.instructions = [
			"PLACE 1,2,EAST",
			"MOVE",
			"MOVE",
			"LEFT",
			"MOVE",
			"REPORT"
		];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.x).toBe(3);
		expect(doctor.robot.y).toBe(3);
		expect(doctor.robot.direction).toBe("NORTH");
	});
});

it("should not fail, if garbage instructions are provided.", () => {
	doctor.state.instructions = [
		"BIPPLE",
		"PLACE 1,2,EAST",
		"MOVE",
		"MOVE",
		"123-456",
		"LEFT",
		"APPLE",
		"MOVE",
		"BANNANA",
		"RIGHT",
		"REPORT"
	];
	doctor.readInstructions();
	expect(doctor.robot.isOnTableTop).toBeTruthy();
	expect(doctor.robot.x).toBe(3);
	expect(doctor.robot.y).toBe(3);
	expect(doctor.robot.direction).toBe("EAST");
});

describe("when placing the robot,", () => {
	it("should ignore instructions until placement.", () => {
		doctor.state.instructions = [
			"RIGHT",
			"LEFT",
			"MOVE",
			"PLACE 0,0,NORTH",
			"REPORT"
		];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.x).toBe(0);
		expect(doctor.robot.y).toBe(0);
		expect(doctor.robot.direction).toBe("NORTH");
	});

	it("should not allow re-placement.", () => {
		doctor.state.instructions = [
			"PLACE 1,2,EAST",
			"MOVE",
			"MOVE",
			"LEFT",
			"MOVE",
			"PLACE 1,2,EAST",
			"RIGHT",
			"REPORT"
		];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.x).toBe(3);
		expect(doctor.robot.y).toBe(3);
		expect(doctor.robot.direction).toBe("EAST");
	});

	it("should not allow placement outside the extremities of the gameboard.", () => {
		const extremities = [-1, 5, 6, 7, 8, 9];
		extremities.forEach(x => {
			extremities.forEach(y => {
				doctor.robot.isOnTableTop = false;
				expect(doctor.robot.isOnTableTop).toBeFalsy();
				doctor.state.instructions = [`PLACE ${x},${y},EAST`, "REPORT"];
				doctor.readInstructions();
				expect(doctor.robot.isOnTableTop).toBeFalsy();
			});
		});
	});

	it("should allow placement on every place of the gameboard.", () => {
		for (let x = 0; x < doctor.tableTop.x; x++) {
			for (let y = 0; y < doctor.tableTop.y; y++) {
				doctor.robot.isOnTableTop = false;
				expect(doctor.robot.isOnTableTop).toBeFalsy();
				doctor.state.instructions = [`PLACE ${x},${y},EAST`, "REPORT"];
				doctor.readInstructions();
				expect(doctor.robot.isOnTableTop).toBeTruthy();
			}
		}
	});

	it("should allow placement with any caridnality.", () => {
		const directions = ["NORTH", "SOUTH", "EAST", "WEST"];
		directions.forEach(direction => {
			doctor.state.instructions = [`PLACE 0,0,${direction}`, "REPORT"];
			doctor.readInstructions();
			expect(doctor.robot.direction).toBe(direction);
			doctor.robot.isOnTableTop = false;
		});
	});
});

describe("when the robot rotates,", () => {
	it("should rotate right as per cardinal points.", () => {
		doctor.state.instructions = ["PLACE 0,0,NORTH", "RIGHT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.direction).toBe("EAST");
		doctor.state.instructions = ["RIGHT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.direction).toBe("SOUTH");
		doctor.state.instructions = ["RIGHT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.direction).toBe("WEST");
		doctor.state.instructions = ["RIGHT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.direction).toBe("NORTH");
	});

	it("should rotate left as per cardinal points.", () => {
		doctor.state.instructions = ["PLACE 0,0,NORTH", "LEFT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.direction).toBe("WEST");
		doctor.state.instructions = ["LEFT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.direction).toBe("SOUTH");
		doctor.state.instructions = ["LEFT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.direction).toBe("EAST");
		doctor.state.instructions = ["LEFT", "REPORT"];
		doctor.readInstructions();
		expect(doctor.robot.direction).toBe("NORTH");
	});
});

describe("when the robot moves,", () => {
	it("should not fall off the table.", () => {
		doctor.state.instructions = [
			"PLACE 4,4,NORTH",
			"MOVE",
			"MOVE",
			"RIGHT",
			"MOVE",
			"MOVE",
			"REPORT"
		];
		doctor.readInstructions();
		expect(doctor.robot.isOnTableTop).toBeTruthy();
		expect(doctor.robot.x).toBe(4);
		expect(doctor.robot.y).toBe(4);
		expect(doctor.robot.direction).toBe("EAST");
	});
});
