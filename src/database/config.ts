import { Sequelize } from "sequelize-typescript";
import knex from 'knex'
import dotenv from "dotenv";
import { User } from "../models/users.models";
import { Course } from "../models/courses.models";
import { Question } from "../models/questions.models";
import { TestResult } from "../models/test-results.models";

dotenv.config();
  const url = String(process.env.DATABASE_URL)

  const config = new Sequelize(url,{
    models:[User,Course,Question,TestResult]
  }) 
// const config = knex({
//   client: 'pg',
//   connection: {
//     host: process.env.POSTGRES_HOST,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB
//   },
//   useNullAsDefault: true
// })

export default config