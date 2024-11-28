import { ProfileRepository, Profile } from "../../database";
import { ProfileDTO, ProfileResponseDTO, ProfileUpdateDTO, UserDTO, UserPasswordUpdateDTO, UserResponseDTO, UserUpdateDTO } from "../../models";

export class ProfileService {
    profileRepository: ProfileRepository;

    constructor() { this.profileRepository = new ProfileRepository(); }

    createProfile = async (profileDto: ProfileDTO): Promise<ProfileResponseDTO> => {
        const profile = profileDto.toProfile();
        return await this.profileRepository.createProfile(profile);
    }

    getProfileByUserKey = async (userKey: string): Promise<ProfileResponseDTO> => {
        return await this.profileRepository.getProfileByUserKey(userKey);
    }

    getProfileByProfileKey = async (profileKey: string): Promise<ProfileResponseDTO> => {
        return await this.profileRepository.getProfileByProfileKey(profileKey);
    }

    getMentors = async (): Promise<ProfileResponseDTO[]> => {
        return await this.profileRepository.getMentorProfiles();
    }

    updateProfileByProfileKey = async (profileKey: string, profile: ProfileUpdateDTO): Promise<void> => {
        await this.profileRepository.updateProfileByProfileKey(profileKey, profile);
    }


    deleteProfileByProfileKey = async (profileKey: string): Promise<void> => {
        await this.profileRepository.deleteProfile(profileKey);
    }

}