import express, { Request, Response, Router } from "express";

import { auth } from "../middleware/auth";
import { User } from "../models/users.models";
import { UserService } from "./user.service";

export const userRouter:Router = express();

const userService = new UserService()

userRouter.post("/", async (req:Request, res:Response) => {
  const user: User = req.body;
  try {
    const newUser = await userService.createUser(user)

    res.status(200).send(newUser)
  } catch (e) {
    console.log(e)
    res.status(500).send('unable to create user');
  }
    
  });

  userRouter.post("/signin", async (req:Request, res:Response) => {
    const {email,password} = req.body;
    try {
      const foundUser = await userService.signIn(email,password);
  
      res.status(200).send(foundUser)
    } catch (e) {
      console.log(e)
      res.status(500).send('unable to signin');
    }
      
    });

  userRouter.get("/", async (req:Request, res:Response) => {
    try {
      const users: User[] = await userService.getUsers();
  
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send('cannot get users');
    }
  });
  
  userRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const user = await userService.getUserById(id);
      // console.log(user)
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send('user not found');
    }
  });

  userRouter.put("/:id", auth, async (req:Request, res:Response) => {
    const id: string = req.params.id
    // const user: BaseUser = req.body;
    const user: User = req.body;

    try {
      await userService.updateUser(id,user);
      const updatedUser = await userService.getUserById(id)

      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).send('cannot update user');
    }
  });

  userRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const deleteUser = await userService.deleteUser(id);
      res.sendStatus(200).send(deleteUser)

    } catch (error) {
      res.sendStatus(500).send('cannot delete user');
    }
  });