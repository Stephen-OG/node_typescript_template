import express, {Application} from 'express';
import cors from 'cors'
import { userRouter } from './user/user.router';
import { courseRouter } from './course/course.router';
import { questionRouter } from './question/question.router';
import { testResultRouter } from './test-result/test-result.router';

const app:Application = express();

app.use(cors())
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/courses", courseRouter)
app.use("/api/questions", questionRouter)
app.use("/api/tests", testResultRouter)

export default app