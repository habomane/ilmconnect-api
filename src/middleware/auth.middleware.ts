import { NextFunction, Request, Response } from "express";
import { Session } from "../database";
import { SessionController } from "../controllers";
import { HttpResponse } from "../models";

export const validateSessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const sessionController = new SessionController();
  // if (req.url === "/user/login" || req.url === "/user/register" || req.url === "/ping") {
  //   next();
  //   return;
  // }
  // const isValidSession = await sessionController.validateSession(req, res);
  // if(isValidSession) { next(); };

  next();
};

export const setCookiesMiddleware = async (
  session: Session,
  response: HttpResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateExpiredUserTimezone = await session.getDateUserTimezone(
    req.ip || ""
  );
   
  res.cookie("token", session.token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: dateExpiredUserTimezone,
  });

  res.status(response.status).send(response);
};
