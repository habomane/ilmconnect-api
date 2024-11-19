import { UserRepository, User } from "../../database";
import { UserDTO, UserPasswordUpdateDTO, UserResponseDTO, UserUpdateDTO } from "../../models";

export class UserService {
    userRepoistory: UserRepository;

    constructor() { this.userRepoistory = new UserRepository(); }

    createuser = async (userDTO: UserDTO): Promise<UserResponseDTO> => {
        const user = await userDTO.toUser();
        return await this.userRepoistory.createUser(user);
    }

    getUser = async (userKey: string): Promise<UserResponseDTO> => {
        return await this.userRepoistory.getUserByUserKey(userKey);
    }

    updateUser = async (userKey: string, user: UserUpdateDTO): Promise<void> => {
        await this.userRepoistory.updateUser(userKey, user);
    }

    updateUserPassword = async (userKey: string, passwordData: UserPasswordUpdateDTO): Promise<void> => {
        await this.userRepoistory.updateUserPassword(userKey, passwordData);
    }

    deleteUser = async (userKey: string): Promise<void> => {
        await this.userRepoistory.deleteUser(userKey);
    }

    validateUser = async (emailAddresss: string, password: string): Promise<{userKey: string, user: UserResponseDTO}> => {
        return await this.userRepoistory.validateUserCredentials(emailAddresss, password);
    }

}