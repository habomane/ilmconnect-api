export const HTTP_RESPONSE_CODE = {
    NOT_FOUND: 404,
    CREATED: 201,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    PAGE_EXPIRED: 419
  };
  
  export const APP_SUCCESS_MESSAGE = {
    createdUser: "User created successfully",
    createdSkill: "Skill created successfully",
    createdProfile: "Profile created successfully",
    userAuthenticated: "User authenticated successfully",
    userDeleted: "User deleted successfully",
    profileDeleted: "Profile deleted successfully",
    skillDeleted: "Skill deleted successfully",
    userFound: "User returned successfully",
    profileFound: "Profile returned successfully",
    mentorsFound: "Mentors returned successfully",
    userUpdated: "User information updated successfully",
    profileUpdated: "Profile information updated successfully",
    userPasswordUpdated: "User password updated successfully"
  }

  export const APP_ERROR_MESSAGE = {
    serverError: "Internal server error.",
    mentorsNotFound: "Mentors not found",
    skillQueryParameterNotFound: "Skill must be provided as a query parameter",
    profileNotFound: "Profile does not exist for user.",
    userDoesntExist: "User does not exist",
    sessionByUserDoesntExist: "Session for user does not exist",
    sessionByTokenDoesntExist: "Session for token does not exist",
    invalidPassword: "Password is invalid",
    invalidEmail: "Email address is invalid.",
    emailNotAvailable: "Email already in use.",
    invalidRequest: "Request is invalid. Missing fields.",
    sessionExpired: "Session expired. Please log in again.",
  };