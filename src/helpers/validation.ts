import { body } from 'express-validator'

// User

export const registerUserValidation = [
    body("username").exists().isString().notEmpty(),
    body("firstName").exists().isString().notEmpty(),
    body("lastName").exists().isString().notEmpty(),
    body("email").exists().isString().notEmpty(),
    body("password").exists().isString().notEmpty(),
    body("timezone").exists().isString(),
    body("state").exists().isString(),
    body("country").exists().isString()
]

export const loginUserValidation = [
    body("email").exists().isString().notEmpty(),
    body("password").exists().isString().notEmpty()
]

export const updateUserValidation = [
    body("firstName").exists().isString(),
    body("lastName").exists().isString(),
    body("email").exists().isString(),
    body("timezone").exists().isString(),
    body("state").exists().isString(),
    body("country").exists().isString()
]

export const updateUserPasswordValidation = [
    body("password").exists().isString().notEmpty()
]

export const createProfileValidation = [
    body("userKey").exists().isString().notEmpty(),
    body("displayName").exists().isString(),
    body("profession").exists().isString(),
    body("currentCompany").exists().isString(),
    body("profileType").exists().isString(),
    body("description").exists().isString(),
    body("linkedinLink").exists().isString(),
    body("bookingLink").exists().isString(),
    body("profilePictureLink").exists().isString(),
    body("portfolioLink").exists().isString(),
    body("yearsOfExperience").exists().isNumeric()
]


export const updateProfileValidation = [
    body("displayName").exists().isString(),
    body("profession").exists().isString(),
    body("currentCompany").exists().isString(),
    body("profileType").exists().isString(),
    body("description").exists().isString(),
    body("linkedinLink").exists().isString(),
    body("bookingLink").exists().isString(),
    body("profilePictureLink").exists().isString(),
    body("portfolioLink").exists().isString(),
    body("yearsOfExperience").exists().isNumeric()
]

export const createSkillValidation = [
    body("userKey").exists().isString().notEmpty(),
    body("skill").exists().isString()
]

