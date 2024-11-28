import express from 'express'

import { createSkillValidation } from '../../helpers';
import { SkillController } from '../../controllers';

export const skillRouter = express.Router();
const skillController = new SkillController();

// Route only concerned with HTTP Layer

skillRouter.post("/create", createSkillValidation , skillController.createSkill);
skillRouter.delete("/delete/:profileKey", skillController.deleteSkill);