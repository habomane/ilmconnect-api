import { Session, SessionRepository, User } from "../../database";
import { SessionDTO } from "../../models";

export class SessionService {
    sessionRepoistory: SessionRepository;

    constructor() { this.sessionRepoistory = new SessionRepository(); }

    createSession = async (session: SessionDTO): Promise<Session> => {
        const sessionRequest = await session.toSession();
        return this.sessionRepoistory.putSession(sessionRequest);
    }

    getSessionByUserKey = async (userKey: string): Promise<Session> => {
        return this.sessionRepoistory.getSessionByUser(userKey);
    }

    getSessionByToken = async (token: string): Promise<Session> => {
        return this.sessionRepoistory.getSessionByUser(token);
    }
}