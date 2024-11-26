import { randomUUID } from "crypto";
import { Profile, Skill } from "../../database";

export class ProfileDTO {
    userKey: string;
    profileKey: string;
    displayName: string;
    description: string;
    currentCompany: string;
    profession: string;
    profileType: string;
    linkedinLink: string;
    bookingLink: string;
    profilePictureLink: string;
    portfolioLink: string;
    yearsOfExperience: number;
  
    constructor(
      userKey: string,
      displayName: string,
      profileType: string,
      profession: string,
      currentCompany: string,
      description: string,
      linkedinLink: string,
      profilePictureLink: string,
      portfolioLink: string,
      bookingLink: string,
      yearsOfExperience: number
    ) {
        this.profileKey = String(randomUUID());
        this.userKey = userKey;
        this.bookingLink = bookingLink;
        this.currentCompany = currentCompany;
        this.description = description;
        this.portfolioLink = portfolioLink;
        this.linkedinLink = linkedinLink;
        this.profilePictureLink = profilePictureLink;
        this.profileType = profileType;
        this.displayName = displayName;
        this.profession = profession;
        this.yearsOfExperience = yearsOfExperience;
    }

    toProfile = (): Profile => {
        return new Profile(this.userKey, this.profileKey, this.displayName, this.profileType, this.profession,
            this.currentCompany, this.description, this.linkedinLink, this.profilePictureLink, this.portfolioLink, this.bookingLink, 
            this.yearsOfExperience
        );
    }
}

export class ProfileUpdateDTO {
    displayName?: string;
    description?: string;
    currentCompany?: string;
    profession?: string;
    profileType?: string;
    linkedinLink?: string;
    bookingLink?: string;
    profilePictureLink?: string;
    portfolioLink?: string;
    yearsOfExperience?: number;
  
    constructor(
      displayName: string,
      profileType: string,
      profession: string,
      currentCompany: string,
      description: string,
      linkedinLink: string,
      profilePictureLink: string,
      portfolioLink: string,
      bookingLink: string,
      yearsOfExperience: number
    ) {
        this.bookingLink = bookingLink === "" ? undefined : bookingLink;
        this.currentCompany = currentCompany === "" ? undefined :  currentCompany;
        this.description = description === "" ? undefined : description;
        this.portfolioLink = portfolioLink === "" ? undefined : portfolioLink;
        this.linkedinLink = linkedinLink === "" ? undefined : linkedinLink;
        this.profilePictureLink = profilePictureLink === "" ? undefined : profilePictureLink;
        this.profileType = profileType === "" ? undefined : profileType;
        this.displayName = displayName === "" ? undefined : displayName;
        this.profession = profession === "" ? undefined : profession;
        this.yearsOfExperience = yearsOfExperience === -1 ? undefined : yearsOfExperience;
    }

}


export class ProfileResponseDTO {
    userKey: string;
    profileKey: string;
    displayName: string;
    description: string;
    currentCompany: string;
    profession: string;
    profileType: string;
    linkedinLink: string;
    bookingLink: string;
    profilePictureLink: string;
    portfolioLink: string;
    yearsOfExperience: number;
    skills: Skill[];


    constructor(
        profile: Profile
    ) {
        this.userKey = profile.userKey;
        this.profileKey = profile.profileKey;
        this.bookingLink = profile.bookingLink;
        this.currentCompany = profile.currentCompany;
        this.description = profile.description;
        this.portfolioLink = profile.portfolioLink;
        this.linkedinLink = profile.linkedinLink;
        this.profilePictureLink =profile.profilePictureLink;
        this.profileType = profile.profileType;
        this.displayName = profile.displayName;
        this.profession = profile.profession;
        this.yearsOfExperience = profile.yearsOfExperience;
        this.skills = [];
    }

    setSkills = (skills: Skill[]) : void => {
        this.skills = skills;
    }
}