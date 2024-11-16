export const HTTP_RESPONSE_CODE = {
    NOT_FOUND: 404,
    CREATED: 201,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
  };
  
  export const APP_SUCCESS_MESSAGE = {
    createdUser: "User created successfully",
    userAuthenticated: "User Authenticated successfully",
    userDeleted: "User deleted successfully"
  }

  export const APP_ERROR_MESSAGE = {
    serverError: "Something went wrong, try again later",
    userDoesntExist: "User does not exist",
    eventDoesntExist: "Event does not exist",
    invalidCredentials: "Invalid user email or password",
    invalidEmail: "Enter a valid email address",
    invalidRequest: "Request is invalid. Missing fields.",
    sessionExpired: "Session expired. Please log in again.",
  };