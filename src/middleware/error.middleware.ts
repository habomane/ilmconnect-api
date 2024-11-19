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
    returnedError = new HttpException(
      HTTP_RESPONSE_CODE.SERVER_ERROR,
      APP_ERROR_MESSAGE.serverError
    );
  }
  console.log({error})
  response.status(returnedError.status).send({status: returnedError.status, message: returnedError.message});
};
