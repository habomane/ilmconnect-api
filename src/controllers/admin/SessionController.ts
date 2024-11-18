import { User } from "../../database";
import {
  APP_ERROR_MESSAGE,
  HTTP_RESPONSE_CODE,
  HttpException,
} from "../../error-handling";
import { validateSessionNotExpired } from "../../helpers";
import { errorMiddleware, setCookiesMiddleware } from "../../middleware";
import { HttpResponse, SessionDTO } from "../../models";
import { SessionService } from "../../services";
import { NextFunction, Request, Response } from "express";

export class SessionController {
  sessionService: SessionService;

  constructor() {
    this.sessionService = new SessionService();
  }

  validateSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["token"];
      const sessionData = await this.sessionService.getSessionByToken(token);
      if (!validateSessionNotExpired(sessionData.getDateExpiration())) {
        throw new HttpException(
          HTTP_RESPONSE_CODE.PAGE_EXPIRED,
          APP_ERROR_MESSAGE.sessionExpired
        );
      }

      next();
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };

  createSession = async (
    userKey: string,
    returnedData: HttpResponse,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this.sessionService.createSession(
        new SessionDTO(userKey, req.ip || "")
      );
      if (response) {
        setCookiesMiddleware(response, returnedData, req, res, next);
      }
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };
}
