import { Client } from "@libsql/client/.";
import { tursoDB } from "../../connection";
import { Session } from "../../models";
import { SessionQueries } from "../../../queries/admin";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from "../../../error-handling";

export class SessionRepository {
    db: Client = tursoDB;

    putSession = async (session: Session): Promise<Session> => {
        const response = await this.db.execute({
            sql: SessionQueries.createSession,
            args: [session.userKey, session.token, session.dateExpiration]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        
        return session; 
    }

    getSessionByUser = async (userKey: string): Promise<Session> => {
        const response = await this.db.execute({
            sql: SessionQueries.getLatestSessionByUser,
            args: [userKey]
        })

        if(response.rows.length === 0) { throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.sessionByUserDoesntExist); }

        const returnedUserKey: string = String(response.rows[0]["UserKey"]);
        const returnedToken: string = String(response.rows[0]["Token"]);
        const returnedDateExpiration: string = String(response.rows[0]["DateExpiration"]);

        return new Session(returnedUserKey, returnedToken, returnedDateExpiration); 
    }

    getSessionByToken = async (token: string) => {
        const response = await this.db.execute({
            sql: SessionQueries.getLatestSessionByUser,
            args: [token]
        })

        if(response.rows.length === 0) { throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.sessionByUserDoesntExist); }

        const returnedUserKey: string = String(response.rows[0]["UserKey"]);
        const returnedToken: string = String(response.rows[0]["Token"]);
        const returnedDateExpiration: string = String(response.rows[0]["DateExpiration"]);
        
        return new Session(returnedUserKey, returnedToken, returnedDateExpiration); 
    }
}