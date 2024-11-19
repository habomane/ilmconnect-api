"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPasswordValidation = exports.updateUserValidation = exports.loginUserValidation = exports.registerUserValidation = void 0;
const express_validator_1 = require("express-validator");
// User
exports.registerUserValidation = [
    (0, express_validator_1.body)("username").exists().isString().notEmpty(),
    (0, express_validator_1.body)("firstName").exists().isString().notEmpty(),
    (0, express_validator_1.body)("lastName").exists().isString().notEmpty(),
    (0, express_validator_1.body)("email").exists().isString().notEmpty(),
    (0, express_validator_1.body)("password").exists().isString().notEmpty(),
    (0, express_validator_1.body)("timezone").exists().isString(),
    (0, express_validator_1.body)("state").exists().isString(),
    (0, express_validator_1.body)("country").exists().isString()
];
exports.loginUserValidation = [
    (0, express_validator_1.body)("email").exists().isString().notEmpty(),
    (0, express_validator_1.body)("password").exists().isString().notEmpty()
];
exports.updateUserValidation = [
    (0, express_validator_1.body)("firstName").exists().isString(),
    (0, express_validator_1.body)("lastName").exists().isString(),
    (0, express_validator_1.body)("email").exists().isString(),
    (0, express_validator_1.body)("timezone").exists().isString(),
    (0, express_validator_1.body)("state").exists().isString(),
    (0, express_validator_1.body)("country").exists().isString()
];
exports.updateUserPasswordValidation = [
    (0, express_validator_1.body)("password").exists().isString().notEmpty()
];
