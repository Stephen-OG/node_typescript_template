import { User } from "../models/users.models";
import { UserRepository } from "./user.repository";

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers() {
        return await this.userRepository.getUsers();
    }

    async getUserById(id: string) {
        return await this.userRepository.getUserById(id);
    }

    async createUser(user: User) {
        return await this.userRepository.createUser(user);
    }

    async signIn(email:string, password: string) {
        return await this.userRepository.signIn(email,password);
    }

    async updateUser(id: string, user: User) {
        return await this.userRepository.updateUser(id,user);
    }

    async deleteUser(userId: string) {
        return await this.userRepository.deleteUser(userId);
    }

}