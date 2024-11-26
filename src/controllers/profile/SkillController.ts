import { Skill } from "../../database";
import { APP_ERROR_MESSAGE, APP_SUCCESS_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from "../../error-handling";
import { errorMiddleware } from "../../middleware";
import { HttpResponse } from "../../models";
import { SkillService } from "../../services";
import { NextFunction, Request, Response } from "express";

export class SkillController {
  skillService: SkillService;

  constructor() {
    this.skillService = new SkillService();
  }

  createSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const createdSkill = new Skill(
        req.body["userKey"],
        req.body["skill"]
      );
      const responseBody = await this.skillService.createSkill(createdSkill);
      const response = new HttpResponse(
        HTTP_RESPONSE_CODE.CREATED,
        APP_SUCCESS_MESSAGE.createdSkill,
        responseBody
      );

      res.status(response.status).json(response);
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };


  deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profileKey = req.params["profileKey"];
      const skill = String(req.query.skill);

      if(skill === undefined) { throw new HttpException(HTTP_RESPONSE_CODE.BAD_REQUEST, APP_ERROR_MESSAGE.skillQueryParameterNotFound)}
      
      await this.skillService.deleteSkillByProfileKeyWithSkill(profileKey, skill);
      const response = new HttpResponse(
        HTTP_RESPONSE_CODE.SUCCESS,
        APP_SUCCESS_MESSAGE.skillDeleted
      );

      res.status(response.status).send(response);
    } catch (error) {
      errorMiddleware(error, req, res);
    }
  };

}
