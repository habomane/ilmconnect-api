import { Client } from "@libsql/client/.";
import { tursoDB } from "../../connection";
import { Session } from "../../models";

export class SessionRepository {
    db: Client = tursoDB;

    putSession = async(session: Session) => {

    }

    getSession = async () => {

    }
}