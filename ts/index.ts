interface Arguments {
  a: number;
  b: number;
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error("Too few values");
  if (args.length > 4) throw new Error("Too many values");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      a: Number(args[2]),
      b: Number(args[3]),
    };
  } else {
    throw new Error("Invalid arguments");
  }
};

const add = (a: number, b: number): number => a + b;

const { a, b } = parseArguments(process.argv);
const result: number = add(a, b);

console.log(`${a} + ${b} = ${result}`);
