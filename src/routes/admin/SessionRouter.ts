import express from 'express'
import { SessionController } from '../../controllers';

export const sessionRouter = express.Router();
const sessionController = new SessionController();

// Route only concerned with HTTP Layer

sessionRouter.get("/session", sessionController.retrieveSession);
