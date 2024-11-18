import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from "../error-handling";

export const bodyValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()) { throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST, APP_ERROR_MESSAGE.invalidRequest, validation)}

    next();
}