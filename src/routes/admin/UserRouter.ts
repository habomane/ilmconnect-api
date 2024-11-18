import express from 'express'

import { loginUserValidation, registerUserValidation,
    updateUserValidation,
    updateUserPasswordValidation
 } from '../../helpers';
import { UserController } from '../../controllers';

export const userRouter = express.Router();
const userController = new UserController();

// Route only concerned with HTTP Layer

userRouter.get('/:userKey', userController.getUser);
userRouter.post("/register", registerUserValidation, userController.createUser);
userRouter.post("/login", loginUserValidation, userController.loginUser);
userRouter.delete("/delete/:userKey", userController.deleteUser);
userRouter.put('/update/:userKey', updateUserValidation, userController.updateUser);
userRouter.put('/update/password/:userKey', updateUserPasswordValidation, userController.updatePassword);