import express from "express";
import cors from "cors";
import statusMonitor from "express-status-monitor";
import "./utils/db";
import log from "./utils/logger";
import { PORT } from "./config/index";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import performanceLogger from "./middlewares/performanceLogger";
import requestLogger from "./middlewares/requestLogger";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

app.use(statusMonitor());
app.use(performanceLogger);
app.use(requestLogger);

routes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  log.info(`Example app listening on port ${PORT}!`);
});
