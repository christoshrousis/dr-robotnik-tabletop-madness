import React, { Component } from "react";
import _ from "lodash";
import { Static, Text, Box, Color } from "ink";
import TextInput from "ink-text-input";

const validInstruction = new RegExp(
	"(PLACE [0-9],[0-9],(NORTH|SOUTH|EAST|WEST)|MOVE|LEFT|RIGHT|REPORT)"
);
const isValidInstruction = instruction => validInstruction.exec(instruction);
const isPlaceInstruction = instruction => instruction.indexOf("PLACE") === 0;
// const isValidPlaceInstruction = instruction => isPlaceInstruction(instruction) &&
// 	getXFromPlace(instruction)
const getX = instruction => instruction.substr(6, 1);
const getY = instruction => instruction.substr(8, 1);

class DrRobotnik extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			instructions: [],
			acceptInstructions: true,
			robot: {
				isOnTableTop: false,
				x: -1,
				y: -1,
				direction: "NORTH"
			},
			tableTop: {
				x: 4,
				y: 4
			}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.readInstructions = this.readInstructions.bind(this);
	}

	readInstructions() {
		const { instructions, robot, tableTop } = this.state;
		_.forEach(instructions, instruction => {
			if (isValidInstruction(instruction)) {
				if (!robot.isOnTableTop && isPlaceInstruction(instruction)) {
					const x = getX(instruction);
					const y = getY(instruction);
					const direction = getDirection(instruction);
					if (x <= tableTop.x && x > 0 && y <= tableTop.y && y > 0) {
						robot = {
							isOnTableTop: true,
							x,
							y,
							direction
						};
					}
				} else if (robot.isOnTableTop) {
					if(instruction === "MOVE") {

					} else if ( instruction )
				}
			}
		});
	}

	onSubmit(input) {
		if (input === "") {
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
					<Static>
						<Color blue>Executing Code...</Color>
						<Text>Result, you smell</Text>
					</Static>
				)}
			</>
		);
	}
}

export default DrRobotnik;
