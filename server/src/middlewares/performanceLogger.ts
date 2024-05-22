import { Request, Response, NextFunction } from "express";
import log from "../utils/logger";

const performanceLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    log.info(
      {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      },
      "Request finished"
    );
  });

  next();
};

export default performanceLogger;
