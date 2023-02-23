import express, { Request, Response, Router } from "express";
import { auth } from "../middleware/auth";
import { TestResult } from "../models/test-results.models";
import { TestResultService } from "./test-result.service";

export const testResultRouter:Router = express();

const testResultService = new TestResultService()

testResultRouter.post("/", async (req:Request, res:Response) => {
  const testResultData: TestResult = req.body;
  try {
    const testResult = await testResultService.createTestResult(testResultData)

    res.status(200).send(testResult)
  } catch (e) {
    console.log(e)
    res.status(500).send('unable to create test result');
  }
    
  });

  testResultRouter.get("/", async (req:Request, res:Response) => {
    try {
      const testResult: TestResult[] = await testResultService.getTestResults();
  
      res.status(200).send(testResult);
    } catch (e) {
      res.status(500).send('cannot get test results');
    }
  });
  
  testResultRouter.get("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const testResult = await testResultService.getTestResultById(id);
      // console.log(user)
      res.status(200).send(testResult);
    } catch (e) {
      res.status(500).send('result not found');
    }
  });

  testResultRouter.put("/:id", auth, async (req:Request, res:Response) => {
    const id: string = req.params.id
    // const user: BaseUser = req.body;
    const data: TestResult = req.body;

    try {
      await testResultService.updateTestResult(id,data);
      const updatedTestResult = await testResultService.getTestResultById(id)

      res.status(200).json(updatedTestResult);
    } catch (e) {
      res.status(500).send('cannot update test result');
    }
  });

  testResultRouter.delete("/:id", async (req:Request, res:Response) => {
    const id: string = req.params.id
    try {
      const deleteTestResult = await testResultService.deleteTestResult(id);
      res.sendStatus(200).send(deleteTestResult)

    } catch (error) {
      res.sendStatus(500).send('cannot delete test result');
    }
  });