"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
var parseArguments = function (args) {
    if (args.length < 5)
        throw new Error("Too few values");
    if (args.length > 5)
        throw new Error("Too many values");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        if (!(args[4] in ["+", "-", "*", "/"]))
            throw new Error("Invalid operator: not +, -, *, or /");
        var operator = args[4];
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
            operator: operator,
        };
    }
    else {
        throw new Error("Invalid arguments");
    }
};
var calculator = function (value1, value2, operator) {
    switch (operator) {
        case "+":
            return value1 + value2;
        case "-":
            return value1 - value2;
        case "*":
            return value1 * value2;
        case "/":
            if (value2 === 0)
                throw new Error("Cannot divide by 0");
            return value1 / value2;
    }
};
exports.calculator = calculator;
try {
    var _a = parseArguments(process.argv), value1 = _a.value1, value2 = _a.value2, operator = _a.operator;
    var result = (0, exports.calculator)(value1, value2, operator);
    console.log("".concat(value1, " ").concat(operator, " ").concat(value2, " = ").concat(result));
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
