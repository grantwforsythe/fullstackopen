type Operator = "+" | "-" | "*" | "/";

interface Arguments {
  value1: number;
  value2: number;
  operator: Operator;
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 5) throw new Error("Too few values");
  if (args.length > 5) throw new Error("Too many values");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (!(args[4] in ["+", "-", "*", "/"]))
      throw new Error("Invalid operator: not +, -, *, or /");

    const operator = args[4] as Operator;

    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      operator,
    };
  } else {
    throw new Error("Invalid arguments");
  }
};

export const calculator = (
  value1: number,
  value2: number,
  operator: Operator
): number => {
  switch (operator) {
    case "+":
      return value1 + value2;
    case "-":
      return value1 - value2;
    case "*":
      return value1 * value2;
    case "/":
      if (value2 === 0) throw new Error("Cannot divide by 0");
      return value1 / value2;
  }
};

try {
  const { value1, value2, operator } = parseArguments(process.argv);
  const result: number = calculator(value1, value2, operator);

  console.log(`${value1} ${operator} ${value2} = ${result}`);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
