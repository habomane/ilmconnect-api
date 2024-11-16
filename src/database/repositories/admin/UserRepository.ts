import { Client } from "@libsql/client/.";
import { tursoDB } from "../../connection";
import { User } from "../../models";

export class userRepository {
    db: Client = tursoDB;

    putUser = async(user: User) => {

    }

    getSession = async () => {

    }
}