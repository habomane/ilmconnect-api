import {
    APP_SUCCESS_MESSAGE,
    HTTP_RESPONSE_CODE,
  } from "../../error-handling";
  import { errorMiddleware } from "../../middleware";
  import { HttpResponse, ProfileDTO, ProfileResponseDTO, ProfileUpdateDTO } from "../../models";
  import { ProfileService, SkillService } from "../../services";
  import { NextFunction, Request, Response } from "express";
  
  export class ProfileController {
    profileService: ProfileService;
    skillService: SkillService;
  
    constructor() {
      this.profileService = new ProfileService();
      this.skillService = new SkillService();
    }
  
    getMentors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const mentors = await this.profileService.getMentors();
            const responseBody : ProfileResponseDTO[] = [];

            // Getting skills
            for(const mentor of mentors) {
                const skills = await this.skillService.getAllSkillsByProfileKey(mentor.profileKey);
                mentor.setSkills(skills);

                responseBody.push(mentor);
            }

  
            const response = new HttpResponse(HTTP_RESPONSE_CODE.SUCCESS, APP_SUCCESS_MESSAGE.profileFound, responseBody);
            res.status(response.status).json(response);
  
        } catch (error) {
          errorMiddleware(error, req, res);
        }
      };

    getProfile = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const userKey = req.params["userKey"];
          const responseBody = await this.profileService.getProfileByUserKey(userKey);

          // Getting skills
          const skills = await this.skillService.getAllSkillsByProfileKey(responseBody.profileKey);
          responseBody.setSkills(skills);

          const response = new HttpResponse(HTTP_RESPONSE_CODE.SUCCESS, APP_SUCCESS_MESSAGE.profileFound, responseBody);
          res.status(response.status).send(response);

      } catch (error) {
        errorMiddleware(error, req, res);
      }
    };
  
    createProfile = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const createdProfile = new ProfileDTO(req.body["userKey"], req.body["displayName"], req.body["profileType"], req.body["profession"], 
            req.body["currentCompany"], req.body["description"], req.body["linkedinLink"], 
            req.body["profilePictureLink"], req.body["portfolioLink"], req.body["bookingLink"], req.body["yearsOfExperience"] );
          const responseBody = await this.profileService.createProfile(createdProfile);
          const response = new HttpResponse(HTTP_RESPONSE_CODE.CREATED, APP_SUCCESS_MESSAGE.createdProfile, responseBody);
  
          res.status(response.status).send(response);
      } catch (error) {
        errorMiddleware(error, req, res);
      }
    };

  
    deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const profileKey = req.params["profileKey"];
          await this.skillService.deleteAllSkillsByProfileKey(profileKey);
          await this.profileService.deleteProfileByProfileKey(profileKey);
          const response = new HttpResponse(HTTP_RESPONSE_CODE.SUCCESS, APP_SUCCESS_MESSAGE.profileDeleted);
          res.status(response.status).send(response);
      } catch (error) {
        errorMiddleware(error, req, res);
      }
    };
  
    updateProfile = async (req: Request, res: Response, next: NextFunction) => {
      try {

          const profileKey = req.params["profileKey"];
          const profileUpdateDTO = new ProfileUpdateDTO(
            req.body["displayName"], req.body["profileType"], req.body["profession"], 
            req.body["currentCompany"], req.body["description"], req.body["linkedinLink"], 
            req.body["profilePictureLink"], req.body["portfolioLink"], req.body["bookingLink"], req.body["yearsOfExperience"] 
          );

          await this.profileService.updateProfileByProfileKey(profileKey, profileUpdateDTO);
          
          const response = new HttpResponse(HTTP_RESPONSE_CODE.CREATED, APP_SUCCESS_MESSAGE.profileUpdated);

          res.status(response.status).send(response);
      
      } catch (error) {
        errorMiddleware(error, req, res);
      }
    };
  
  }
  