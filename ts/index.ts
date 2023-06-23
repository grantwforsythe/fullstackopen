import { calculator, Operator } from "./calculator";
import express from "express";
const app = express();

app.use(express.json());

app.get("/ping", (_request, response) => {
  response.send("pong");
});

app.post("/calculate", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, operator } = request.body;

  if (!value1 || isNaN(Number(value1))) {
    return response
      .status(400)
      .send({ error: `${value1} is invalid because it is not number` });
  } else if (!value2 || isNaN(Number(value2))) {
    return response
      .status(400)
      .send({ error: `${value2} is invalid because it is not number` });
  }

  const result = calculator(
    Number(value1),
    Number(value2),
    operator as Operator
  );
  return response.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Live on: http://localhost:${PORT}`);
});
