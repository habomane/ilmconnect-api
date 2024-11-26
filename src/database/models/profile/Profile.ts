export class Profile {
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
      profileKey: string,
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
        this.userKey = userKey;
        this.profileKey = profileKey;
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
  
  }
  
  
  