import express, { Request, Response } from "express";
import cors from "cors";

import "./config/db";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.get("/", (req: Request, res: Response) =>
  res.json({ message: "Hello World!" })
);

app.listen(4000, () => {
  console.log("Example app listening on port 3000!");
});
