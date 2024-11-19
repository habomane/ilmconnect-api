import { genSalt, hash } from 'bcrypt';

export class HashedPassword {
    passwordHash: string;
    salt: string;

    constructor(passwordHash: string, salt: string) {
        this.passwordHash = passwordHash;
        this.salt = salt;
    }
}


export const hashPassword = async (password: string): Promise<HashedPassword> => {
    const salt = await genSalt(16);
    const hashedPassword = await hash(password, salt);
    return new HashedPassword(hashedPassword, salt);
}

export const validatePasswordHash = async (password: string, passwordHash: string, salt: string): Promise<boolean> => {
    const reHashedPassword = await hash(password, salt);
    return reHashedPassword === passwordHash;
}