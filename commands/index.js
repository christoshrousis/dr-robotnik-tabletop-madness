import React, { Component } from "react";
import _ from "lodash";
import { Static, Text, Box, Color } from "ink";
import TextInput from "ink-text-input";

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
const validInstruction = new RegExp(
	"(PLACE [0-9],[0-9],(NORTH|SOUTH|EAST|WEST)|MOVE|LEFT|RIGHT|REPORT)"
);
const isValidInstruction = instruction => validInstruction.exec(instruction);
const isPlaceInstruction = instruction => instruction.indexOf("PLACE") === 0;
const getX = instruction => instruction.substr(6, 1);
const getY = instruction => instruction.substr(8, 1);
const getDirection = instruction => instruction.substr(10);

class DrRobotnik extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			instructions: [],
			acceptInstructions: true
		};
		this.robot = {
			isOnTableTop: false,
			x: -1,
			y: -1,
			direction: "NORTH"
		};
		this.tableTop = {
			x: 4,
			y: 4
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.readInstructions = this.readInstructions.bind(this);
	}

	readInstructions() {
		const { instructions } = this.state;
		const { robot, tableTop } = this;

		instructions.forEach(instruction => {
			if (isValidInstruction(instruction)) {
				if (!robot.isOnTableTop && isPlaceInstruction(instruction)) {
					const x = getX(instruction);
					const y = getY(instruction);
					const direction = getDirection(instruction);
					if (x <= tableTop.x && x >= 0 && y <= tableTop.y && y >= 0) {
						robot.isOnTableTop = true;
						robot.x = x;
						robot.y = y;
						robot.direction = direction;
					}
				} else if (robot.isOnTableTop) {
					switch (instruction) {
						case "MOVE":
							switch (robot.direction) {
								case "NORTH":
									if (robot.y < tableTop.y) robot.y++;
									break;
								case "EAST":
									if (robot.x < tableTop.x) robot.x++;
									break;
								case "SOUTH":
									if (robot.y > 0) robot.y--;
									break;
								case "WEST":
									if (robot.x > 0) robot.x--;
									break;
							}
							break;
						case "LEFT":
							robot.direction =
								directions.indexOf(robot.direction) === 0
									? directions[directions.length - 1]
									: directions[directions.indexOf(robot.direction) - 1];
							break;
						case "RIGHT":
							robot.direction =
								directions.length - directions.indexOf(robot.direction) === 1
									? directions[0]
									: directions[directions.indexOf(robot.direction) + 1];
							break;
					}
				}
			}
		});
	}

	onSubmit(input) {
		if (input === "REPORT") {
			this.readInstructions();
			this.setState({ acceptInstructions: false });
		} else {
			const instructions = this.state.instructions;
			instructions.push(input);
			this.setState({ instructions, query: "" });
		}
	}

	onChange(query) {
		this.setState({ query });
	}

	render() {
		const { acceptInstructions, instructions, query } = this.state;
		const { robot } = this;
		return (
			<>
				{acceptInstructions ? (
					<>
						<Static>
							<Color blue>Dr.Robotnik's Tabletop Madness Simulator</Color>
							{instructions.map((instruction, index) => (
								<Box key={index}>{instruction}</Box>
							))}
						</Static>
						<TextInput
							value={query}
							onChange={this.onChange}
							onSubmit={this.onSubmit}
						/>
					</>
				) : (
					<>
						<Color blue>Executing Code...</Color>
						{robot.x === -1 ? (
							<Color red>Dr.Robotnik never made it on the table!</Color>
						) : (
							<Color green>
								Dr.Robotnik is at: {robot.x},{robot.y} and is facing{" "}
								{robot.direction}.
							</Color>
						)}
					</>
				)}
			</>
		);
	}
}

export default DrRobotnik;
