"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const error_handling_1 = require("../error-handling");
const bodyValidationMiddleware = (req, res, next) => {
    const validation = (0, express_validator_1.validationResult)(req);
    if (!validation.isEmpty()) {
        throw new error_handling_1.HttpException(error_handling_1.HTTP_RESPONSE_CODE.BAD_REQUEST, error_handling_1.APP_ERROR_MESSAGE.invalidRequest, validation);
    }
    next();
};
exports.bodyValidationMiddleware = bodyValidationMiddleware;
