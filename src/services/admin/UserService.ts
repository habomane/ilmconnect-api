import { UserRepository, User } from "../../database";
import {
  UserDTO,
  UserPasswordUpdateDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from "../../models";

export class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = async (userDTO: UserDTO): Promise<UserResponseDTO> => {
    const user = await userDTO.toUser();
    return await this.userRepository.createUser(user);
  };

  getUser = async (userKey: string): Promise<UserResponseDTO> => {
    return await this.userRepository.getUserByUserKey(userKey);
  };

  updateUser = async (userKey: string, user: UserUpdateDTO): Promise<void> => {
    await this.userRepository.updateUser(userKey, user);
  };

  updateUserPassword = async (
    userKey: string,
    passwordData: UserPasswordUpdateDTO
  ): Promise<void> => {
    await this.userRepository.updateUserPassword(userKey, passwordData);
  };

  deleteUser = async (userKey: string): Promise<void> => {
    await this.userRepository.deleteUser(userKey);
  };

  validateUser = async (
    emailAddresss: string,
    password: string
  ): Promise<UserResponseDTO> => {
    return await this.userRepository.validateUserCredentials(
      emailAddresss,
      password
    );
  };
}
