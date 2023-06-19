type Operation = "multiply" | "add" | "divide";
type Result = number | string;

const calculator = (a: number, b: number, operator: Operation): Result => {
  switch (operator) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0");
      return a / b;
    default:
      throw new Error("Invalid operation");
  }
};

console.log(`2 + 4 = ${calculator(2, 4, "add")}`);
