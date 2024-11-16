import { SessionRepository } from "../../database";

export class SessionService {
    sessionRepoistory: SessionRepository;

    constructor() { this.sessionRepoistory = new SessionRepository(); }

}