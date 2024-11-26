export const SkillQueries = {
    createSkill: "INSERT INTO Skills(ProfileKey, Skill) VALUES (?, ?)",
    getSkillByProfileKey: "SELECT * FROM Skills WHERE ProfileKey = ?", 
    deleteAllSkillsByProfileKey: "DELETE FROM Skills WHERE ProfileKey =?",
    deleteSkillByProfileKeyWithSkill: "DELETE FROM Skills WHERE ProfileKey =? and Skill = ?",
}