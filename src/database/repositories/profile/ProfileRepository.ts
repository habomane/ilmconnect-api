import { Client } from "@libsql/client/.";
import { tursoDB } from "../../connection";
import { Profile } from "../../models";
import { ProfileResponseDTO, ProfileUpdateDTO } from "../../../models";
import { ProfileQueries } from "../../../queries";
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, HttpException } from "../../../error-handling";


export class ProfileRepository {
    db: Client = tursoDB;

    createProfile = async(profile: Profile) : Promise<ProfileResponseDTO> => {
        const response = await this.db.execute({
            sql: ProfileQueries.createProfile,
            args: [profile.profileKey, profile.userKey, profile.displayName, profile.profession, profile.currentCompany, 
                profile.profileType, profile.description, profile.linkedinLink, profile.bookingLink, profile.profilePictureLink, 
                profile.portfolioLink, profile.yearsOfExperience
            ]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        
        return new ProfileResponseDTO(profile);
    }

    getMentorProfiles = async (): Promise<ProfileResponseDTO[]> => {
        const response = await this.db.execute(ProfileQueries.getMentors);

        if(response.rows.length === 0) { throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.mentorsNotFound); }

        const results: ProfileResponseDTO[] = [];
        for(let i = 0; i < response.rows.length; i++) {
            const data = JSON.parse(JSON.stringify(response.rows[i]));
            const profile = new Profile(data["UserKey"], data["ProfileKey"], data["DisplayName"], data["ProfileType"], data["Profession"], data["CurrentCompany"], data["Description"], data["LinkedinList"],
                data["ProfilePictureLink"], data["PortfolioLink"], data["BookingLink"], data["YearsOfExperience"]
            );
            results.push(new ProfileResponseDTO(profile));
        }

        return results;
    }
    
    getProfileByUserKey = async (userKey: string): Promise<ProfileResponseDTO> => {
        const response = await this.db.execute({
            sql:  ProfileQueries.getProfileByUserKey,
            args: [userKey]
        })

        if(response.rows.length === 0) { throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.profileNotFound); }

        const data = JSON.parse(JSON.stringify(response.rows[0]));

        const profile = new Profile(data["UserKey"], data["ProfileKey"], data["DisplayName"], data["ProfileType"], data["Profession"], data["CurrentCompany"], data["Description"], data["LinkedinList"],
            data["ProfilePictureLink"], data["PortfolioLink"], data["BookingLink"], data["YearsOfExperience"]
        );

        return new ProfileResponseDTO(profile);


    }

    getProfileByProfileKey = async (profileKey: string): Promise<ProfileResponseDTO> => {
        const response = await this.db.execute({
            sql:  ProfileQueries.getProfileByProfileKey,
            args: [profileKey]
        })

        if(response.rows.length === 0) { throw new HttpException(HTTP_RESPONSE_CODE.NOT_FOUND, APP_ERROR_MESSAGE.profileNotFound); }

        const data = JSON.parse(JSON.stringify(response.rows[0]));

        const profile = new Profile(data["UserKey"], data["ProfileKey"], data["DisplayName"], data["ProfileType"], data["Profession"], data["CurrentCompany"], data["Description"], data["LinkedinList"],
            data["ProfilePictureLink"], data["PortfolioLink"], data["BookingLink"], data["YearsOfExperience"]
        );

        return new ProfileResponseDTO(profile);


    }

    updateProfileByProfileKey = async (profileKey: string, profile: ProfileUpdateDTO): Promise<void> => {

        if(profile.bookingLink !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileBookingLink,
                args: [profile.bookingLink, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.currentCompany !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileCurrentCompany,
                args: [profile.currentCompany, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.description !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileDescription,
                args: [profile.description, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.displayName !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileDisplayName,
                args: [profile.displayName, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.linkedinLink !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileLinkedinLink,
                args: [profile.linkedinLink, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.portfolioLink !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfilePortfolioLink,
                args: [profile.portfolioLink, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.profession !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileProfession,
                args: [profile.profession, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.profilePictureLink !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileProfilePictureLink,
                args: [profile.profilePictureLink, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.profileType !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileProfileType,
                args: [profile.profileType, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }

        if(profile.yearsOfExperience !== undefined) {
            const response = await this.db.execute({
                sql: ProfileQueries.updateProfileYearsOfExperience,
                args: [profile.yearsOfExperience, profileKey]
            })

            if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
        }
    }

    deleteProfile = async (profileKey: string): Promise<void> => {
        const response = await this.db.execute({
            sql:  ProfileQueries.deleteProfile,
            args: [profileKey]
        })

        if(response.toJSON()["status"] === "error") { throw new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE.serverError); }
    }
}