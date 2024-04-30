import express from "express";
import cors from "cors";

import "./utils/db";
import log from "./utils/logger";
import { PORT } from "./config/index";
import routes from "./routes";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.listen(PORT, () => {
  log.info(`Example app listening on port ${PORT}!`);

  routes(app);
});
