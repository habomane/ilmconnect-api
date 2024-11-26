import { Client } from "@libsql/client/.";
import { tursoDB } from "../../connection";
import { Skill } from "../../models";
import { HttpResponse, UserPasswordUpdateDTO, UserResponseDTO, UserUpdateDTO } from "../../../models";
import { SkillQueries } from "../../../queries";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from "../../../error-handling";
import { validatePasswordHash } from "../../../helpers";

export class SkillRepository {
    db: Client = tursoDB;

    createSkill = async(skill: Skill) : Promise<Skill> => {
        const response = await this.db.execute({
            sql: SkillQueries.createSkill,
            args: [skill.profileKey, skill.skill]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        
        return skill; 
    }

    getSkillsByProfile = async (profileKey: string): Promise<Skill[]> => {
        const response = await this.db.execute({
            sql:  SkillQueries.getSkillByProfileKey,
            args: [profileKey]
        })

        if(response.rows.length === 0) { return []; }

        const results: Skill[] = [];
        for(let i = 0; i < response.rows.length; i++) {
            const data = JSON.parse(JSON.stringify(response.rows[i]));
            const skill = new Skill(data["ProfileKey"], data["Skill"]);
            results.push(skill);
        }

        return results;

    }

    deleteSkill = async (profileKey: string, skill: string): Promise<void> => {
        const response = await this.db.execute({
            sql:  SkillQueries.deleteSkillByProfileKeyWithSkill,
            args: [profileKey, skill]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
    }

    deleteAllSkills = async (profileKey: string): Promise<void> => {
        const response = await this.db.execute({
            sql:  SkillQueries.deleteAllSkillsByProfileKey,
            args: [profileKey]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
    }

}