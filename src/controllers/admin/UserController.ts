import { User } from "../../database";
import {
  APP_ERROR_MESSAGE,
  APP_SUCCESS_MESSAGE,
  HTTP_RESPONSE_CODE,
  HttpException,
} from "../../error-handling";
import { errorMiddleware } from "../../middleware";
import { HttpResponse, UserDTO, UserPasswordUpdateDTO, UserUpdateDTO } from "../../models";
import { UserService } from "../../services";
import { NextFunction, Request, Response } from "express";
import { SessionController } from "./SessionController";

export class UserController {
  userService: UserService;
  sessionController: SessionController;

  constructor() {
    this.userService = new UserService();
    this.sessionController = new SessionController();
  }

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userKey = req.params[0];
        const responseBody = await this.userService.getUser(userKey);

        const response = new HttpResponse(HTTP_RESPONSE_CODE.SUCCESS, APP_SUCCESS_MESSAGE.userFound, responseBody);
        res.status(response.status).send(response);
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdUserDTO = new UserDTO(req.body["firstName"], req.body["lastName"], req.body["email"], req.body["password"], req.body["timezone"], req.body["state"], req.body["country"]);
        const userKey = createdUserDTO.userKey;
        const responseBody = await this.userService.createuser(createdUserDTO);
        const response = new HttpResponse(HTTP_RESPONSE_CODE.CREATED, APP_SUCCESS_MESSAGE.createdUser, responseBody);

        this.sessionController.createSession(userKey, response, req, res, next);
        
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseBody = await this.userService.validateUser(req.body["email"], req.body["password"]);
        const response = new HttpResponse(HTTP_RESPONSE_CODE.SUCCESS, APP_SUCCESS_MESSAGE.userAuthenticated, responseBody);
        res.status(response.status).send(response);
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userKey = req.params[0];
        await this.userService.deleteUser(userKey);
        const response = new HttpResponse(HTTP_RESPONSE_CODE.SUCCESS, APP_SUCCESS_MESSAGE.userDeleted);
        res.status(response.status).send(response);
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userKey = req.params[0];
        const userUpdateDTO = new UserUpdateDTO(req.body["firstName"], req.body["lastName"], req.body["email"], req.body["timezone"], req.body["state"], req.body["country"]);
        await this.userService.updateUser(userKey, userUpdateDTO);
        const response = new HttpResponse(HTTP_RESPONSE_CODE.CREATED, APP_SUCCESS_MESSAGE.userDeleted);
        res.status(response.status).send(response);
    
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userKey = req.params[0];
        const userPasswordDTO = new UserPasswordUpdateDTO( req.body["password"]);
        await this.userService.updateUserPassword(userKey, userPasswordDTO);
        const response = new HttpResponse(HTTP_RESPONSE_CODE.CREATED, APP_SUCCESS_MESSAGE.userDeleted);
        res.status(response.status).send(response);
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };
}
