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