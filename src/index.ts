import {Request,Response} from 'express';
import app from './app'
import dotenv from "dotenv";
import config from './database/config';
dotenv.config();

const PORT = process.env.PORT || 8000;

const start = async (): Promise<void> => {
    try {
      await config.sync();
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  app.get("/", (req:Request, res:Response):void => {
    res.send("CBT apis")
});


void start();

