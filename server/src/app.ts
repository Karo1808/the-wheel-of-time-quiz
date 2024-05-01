import express from "express";
import cors from "cors";

import "./utils/db";
import log from "./utils/logger";
import { PORT } from "./config/index";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

routes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  log.info(`Example app listening on port ${PORT}!`);
});
