# dr-robotnik

## Assumptions & Criticisims.

It only accepts instructions in capitals on purpose.

I've assumed that in future, that the board size might change, but I've only accommodated for a single digit input, double digit inputs will break PLACE command validity checks. Adding this functionality is a matter of updating the main regular expression to allow multiple number digits in succession, and change the way the X/Y values are extracted from the PLACE Instruction.

I've used React's "setState" for certain flags, but also used it to store the initial game board state. Ultimately, "readInstructions" cannot edit the state and determine the final state of the report at the same time.

> This readme is automatically generated by [create-pastel-app](https://github.com/vadimdemedes/create-pastel-app)

## Install

```bash
$ npm install dr-robotnik
```

## CLI

```
$ dr-robotnik --help
dr-robotnik

Hello world command

Options:

	--name  Name of the person to greet           [string]
```

## Development

There are 2 available commands:

- `npm run dev` - Start development mode and recompile on change
- `npm run build` - Build a final distributable for npm
