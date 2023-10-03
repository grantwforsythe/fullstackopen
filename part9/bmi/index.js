"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var calculator_1 = require("./calculator");
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/ping", function (_request, response) {
    response.send("pong");
});
app.post("/calculate", function (request, response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var _a = request.body, value1 = _a.value1, value2 = _a.value2, operator = _a.operator;
    if (!value1 || isNaN(Number(value1))) {
        return response
            .status(400)
            .send({ error: "".concat(value1, " is invalid because it is not number") });
    }
    else if (!value2 || isNaN(Number(value2))) {
        return response
            .status(400)
            .send({ error: "".concat(value2, " is invalid because it is not number") });
    }
    var result = (0, calculator_1.calculator)(Number(value1), Number(value2), operator);
    return response.send({ result: result });
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Live on: http://localhost:".concat(PORT));
});
