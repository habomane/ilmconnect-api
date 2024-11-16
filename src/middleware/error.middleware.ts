import { Request, Response } from "express";
import { HttpException, APP_ERROR_MESSAGE } from "../error-handling";

export const errorMiddleware = (error: HttpException, request: Request, response: Response) => {
  const status = error.status ? error.status : 500;
  const message = status === 500 ? APP_ERROR_MESSAGE.serverError : error.message;
  const errors = error.error;
  response.status(status).send({ status, message, error: errors });
}
