import express from 'express'

import { createProfileValidation, updateProfileValidation } from '../../helpers';
import { ProfileController } from '../../controllers';

export const profileRouter = express.Router();
const profileController = new ProfileController();

// Route only concerned with HTTP Layer

profileRouter.get('/mentors', profileController.getMentors);
profileRouter.get("/user/:userKey", profileController.getProfileByUserKey);
profileRouter.get("/:profileKey", profileController.getProfileByProfileKey);
profileRouter.post("/create", createProfileValidation, profileController.createProfile);
profileRouter.delete("/delete/:profileKey", profileController.deleteProfile);
profileRouter.put('/update/:profileKey', updateProfileValidation, profileController.updateProfile);