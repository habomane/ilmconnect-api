import { Request, Response } from "express";
import {
  HttpException,
  APP_ERROR_MESSAGE,
  HTTP_RESPONSE_CODE,
} from "../error-handling";

export const errorMiddleware = (
  error: unknown,
  request: Request,
  response: Response
) => {
  let returnedError: HttpException;
  if (error instanceof HttpException) {
    returnedError = error;
  } else {
    const errorMessage =
      error instanceof Error ? error.message : APP_ERROR_MESSAGE.serverError;
    returnedError = new HttpException(
      HTTP_RESPONSE_CODE.SERVER_ERROR,
      errorMessage
    );
  }
  response.status(returnedError.status).send(returnedError);
};
