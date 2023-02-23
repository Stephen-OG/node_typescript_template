import express, { Request, Response, Router } from "express";
import { auth } from "../middleware/auth";
import { Course } from "../models/courses.models";
import { CourseService } from "./course.service";

export const courseRouter:Router = express();

const courseService = new CourseService()

courseRouter.post("/", async (req:Request, res:Response) => {
  const course: Course = req.body;
  try {
    const newCourse = await courseService.createCourse(course)

    res.status(200).send(newCourse)
  } catch (e) {
    console.log(e)
    res.status(500).send('unable to create user');
  }
    
  });

    courseRouter.get("/", async (req:Request, res:Response) => {
    try {
      const course: Course[] = await courseService.getCourses();
  
      res.status(200).send(course);
    } catch (e) {
      res.status(500).send('cannot get users');
    }
  });
  
  courseRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const course = await courseService.getCourseById(id);
      // console.log(user)
      res.status(200).send(course);
    } catch (e) {
      res.status(500).send('user not found');
    }
  });

  courseRouter.put("/:id", auth, async (req:Request, res:Response) => {
    const id: string = req.params.id
    // const user: BaseUser = req.body;
    const course: Course = req.body;

    try {
      await courseService.updateCourse(id,course);
      const updatedUser = await courseService.getCourseById(id)

      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).send('cannot update user');
    }
  });

  courseRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const deleteCourse = await courseService.deleteCourse(id);
      res.sendStatus(200).send(deleteCourse)

    } catch (error) {
      res.sendStatus(500).send('cannot delete user');
    }
  });