import config from "../database/config";
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { User } from "../models/users.models";
import { SECRET_KEY } from "../utils/constants";

export class UserRepository {
    private usersRespository: any;
    constructor(){
        this.usersRespository = config.getRepository(User)
    }

    async createUser(newUser: User) {
        const id = uuid();
        const user = {
            ...newUser,
            id,
        };
        const now = new Date()
        user.createdAt = now;
        user.updatedAt = now;
        user.password = await bcrypt.hash(user.password, 8)

        await this.usersRespository.create(user);
        
        return user;
        
    }

    async signIn (email: string, pass: string) {
        const user = await this.usersRespository.findOne({where:{email: email}})
        console.log(user)
        if(!user){
            throw new Error('no user found')
        }
        const { dataValues: {password}} = user
        console.log(password)
        
        const isMatch = bcrypt.compareSync(pass, password);
        if (isMatch) {
        const token = jwt.sign({ email: email }, SECRET_KEY, {
            expiresIn: '2 days',
            });
            return {user: user, token: token}
        } else {
            throw new Error('Password is not correct');
        }
    };

    async getUsers() {   
        const users = await this.usersRespository.findAll();
        console.log('users:::', users);
        return users;
    }

    async getUserById (id: string) {
        // const user = await this.usersRespository.find({id})
        const user = await this.usersRespository.findAll({where:{id:id}})
        // console.log(user)
        if(!user){
            throw new Error('user not found')
        }
        return user;
    };

    async getUserByEmail (email: string) {
        const user = await this.usersRespository.find({where:{email:email}})
        if(!user){
            throw new Error('user not found')
        }
        return user;
    };

    async updateUser(id:string,userUpdate: User) {

        userUpdate.updatedAt = new Date().toISOString();
            const updatedUser = await this.usersRespository.update({...userUpdate}, {
                where: {
                    id: id
                }
            });
      
        return updatedUser;
    }

    async deleteUser(id:string) {

        const data = await this.usersRespository.destroy({
                where: {
                    id: id
                }
            });
        return data;
    }
}