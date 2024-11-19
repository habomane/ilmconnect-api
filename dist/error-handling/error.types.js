"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ERROR_MESSAGE = exports.APP_SUCCESS_MESSAGE = exports.HTTP_RESPONSE_CODE = void 0;
exports.HTTP_RESPONSE_CODE = {
    NOT_FOUND: 404,
    CREATED: 201,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    PAGE_EXPIRED: 419
};
exports.APP_SUCCESS_MESSAGE = {
    createdUser: "User created successfully",
    userAuthenticated: "User authenticated successfully",
    userDeleted: "User deleted successfully",
    userFound: "User returned successfully",
    userUpdated: "User information updated successfully",
    userPasswordUpdated: "User password updated successfully"
};
exports.APP_ERROR_MESSAGE = {
    serverError: "Something went wrong, try again later",
    userDoesntExist: "User does not exist",
    sessionByUserDoesntExist: "Session for user does not exist",
    sessionByTokenDoesntExist: "Session for token does not exist",
    invalidPassword: "Password is invalid",
    invalidEmail: "Email address is invalid.",
    emailNotAvailable: "Email already in use.",
    invalidRequest: "Request is invalid. Missing fields.",
    sessionExpired: "Session expired. Please log in again.",
};
