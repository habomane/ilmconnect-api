import { NextFunction, Request, Response } from "express";
import { Session } from "../database";
import { SessionController } from "../controllers";

export const validateSessionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionController = new SessionController();
  if (req.url === "/user/login" || req.url === "/user/register") {
    next();
    return;
  }
  sessionController.validateSession(req, res, next);
};

export const setCookiesMiddleware = async (
  session: Session,
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

  next();
};
