import { getDateGMT } from "../../helpers";
import { SessionService } from "../../services/admin/SessionService";
import { NextFunction, Request, Response } from "express";

export class SessionController {
    sessionService: SessionService;

    constructor() { this.sessionService = new SessionService(); }

    retrieveSession = async (req: Request, res: Response, next: NextFunction) => {
    
        try {
            const date = new Date();
            const ip = req.ip;
            res.send( ip);
            // const timezone = getDateGMT(date, ip);

        }
        catch(error){
            res.send(error)
        }



        }
}