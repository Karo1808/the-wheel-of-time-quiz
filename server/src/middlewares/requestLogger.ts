import { Request, Response, NextFunction } from "express";
import log from "../utils/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  log.info(
    {
      method: req.method,
      path: req.path,
      body: req.body,
      query: req.query,
    },
    "Incoming request"
  );

  const originalSend = res.send;

  res.send = function (body) {
    res.send = originalSend; // reset send to original function
    log.info(
      {
        statusCode: res.statusCode,
        body,
      },
      "Outgoing response"
    );
    return res.send(body);
  };

  next();
};

export default requestLogger;
