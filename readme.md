# Dr.Robotnik's Tabletop Madness

Dr.Robotnik wants you to place him on the tabletop. Will you be successful?

Dr.Robotnik is a CLI written in Javascript and React, using the library [PastelJS](https://github.com/vadimdemedes/pastel) for bundling and [Ink](https://github.com/vadimdemedes/ink) for building CLI output using React!

## Install & Run The CLI

```
$ npm install dr-robotnik
```

```
$ dr-robotnik
```

Upon running Dr.Robotnik, he will keep accepting commands, followed by carriage return, until you issue a `REPORT` command, which will then make Dr.Robotnik attempt to traverse the tabletop.

For Example:

```
$ dr-robotnik
Dr.Robotnik's Tabletop Madness
PLACE 0,0,NORTH
MOVE
REPORT
Executing Code...
Dr.Robotnik is at: 0,1 and is facing NORTH.
```

Dr.Robotnik accepts all the classic `Toy Robot` favourites, such as:

- `PLACE X,Y,CARDINALITY`
- `LEFT`
- `RIGHT`
- `MOVE`
- `REPORT`

## To test Dr.Robotnik

You will need to install development packages by running

```
$ npm install
```

And then to run the test suite, run

```
$ npm run test
```

## To develop Dr.Robotnik

If for some reason the installation isn't working, you can always run Dr.Robotnik in dev mode by running

```
$ npm run dev
```

## Assumptions.

- Instructions are only meant to be in capitals
- `REPORT` will only ever be called once, at the end of the string of instructions as per the examples provided. Subsequent runs will require a re-run of `dr.robotnik`
