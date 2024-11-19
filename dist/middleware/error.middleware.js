"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const error_handling_1 = require("../error-handling");
const errorMiddleware = (error, request, response) => {
    let returnedError;
    if (error instanceof error_handling_1.HttpException) {
        returnedError = error;
    }
    else {
        returnedError = new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.SERVER_ERROR, error_handling_1.APP_ERROR_MESSAGE.serverError);
    }
    console.log({ error });
    response.status(returnedError.status).send({ status: returnedError.status, message: returnedError.message });
};
exports.errorMiddleware = errorMiddleware;
