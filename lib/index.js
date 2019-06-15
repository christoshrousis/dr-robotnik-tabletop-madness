export const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
export const validInstructions = new RegExp(
	"(^PLACE [0-9],[0-9],(NORTH|SOUTH|EAST|WEST)$|^MOVE$|^LEFT$|^RIGHT$|^REPORT$)"
);
export const isValidInstruction = instruction =>
	validInstructions.exec(instruction);
export const isPlaceInstruction = instruction =>
	instruction.indexOf("PLACE") === 0;

export const getX = instruction => parseInt(instruction.substr(6, 1));
export const getY = instruction => parseInt(instruction.substr(8, 1));
export const getDirection = instruction => instruction.substr(10);
