import express, { Request, Response, Router } from "express";
import { auth } from "../middleware/auth";
import { Course } from "../models/courses.models";
import { Question } from "../models/questions.models";
import { QuestionService } from "./question.service";

export const questionRouter:Router = express();

const questionService = new QuestionService()

questionRouter.post("/", async (req:Request, res:Response) => {
  const questionData: Question = req.body;
  try {
    const question = await questionService.createQuestion(questionData)

    res.status(200).send(question)
  } catch (e) {
    console.log(e)
    res.status(500).send('unable to create question');
  }
    
  });

  questionRouter.get("/", async (req:Request, res:Response) => {
    try {
      const question: Question[] = await questionService.getQuestions();
  
      res.status(200).send(question);
    } catch (e) {
      res.status(500).send('cannot get questions');
    }
  });
  
  questionRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const question = await questionService.getQuestionById(id);
      // console.log(user)
      res.status(200).send(question);
    } catch (e) {
      res.status(500).send('question not found');
    }
  });

  questionRouter.put("/:id", auth, async (req:Request, res:Response) => {
    const id: string = req.params.id
    // const user: BaseUser = req.body;
    const question: Question = req.body;

    try {
      await questionService.updateQuestion(id,question);
      const updatedQuestion = await questionService.getQuestionById(id)

      res.status(200).json(updatedQuestion);
    } catch (e) {
      res.status(500).send('cannot update question');
    }
  });

  questionRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const deleteQuestion = await questionService.deleteQuestion(id);
      res.sendStatus(200).send(deleteQuestion)

    } catch (error) {
      res.sendStatus(500).send('cannot delete user');
    }
  });