import { SkillRepository, User, Skill } from "../../database";
import { UserDTO, UserPasswordUpdateDTO, UserResponseDTO, UserUpdateDTO } from "../../models";

export class SkillService {
    skillRepository: SkillRepository;

    constructor() { this.skillRepository = new SkillRepository(); }

    createSkill = async (skill: Skill): Promise<Skill> => {
        return await this.skillRepository.createSkill(skill);
    }

    getAllSkillsByProfileKey = async (profileKey: string): Promise<Skill[]> => {
        return await this.skillRepository.getSkillsByProfile(profileKey);
    }


    deleteAllSkillsByProfileKey = async (profileKey: string): Promise<void> => {
        await this.skillRepository.deleteAllSkills(profileKey);
    }

    deleteSkillByProfileKeyWithSkill = async (profileKey: string, skill: string): Promise<void> => {
        await this.skillRepository.deleteSkill(profileKey, skill);
    }


}