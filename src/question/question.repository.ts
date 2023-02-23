import config from "../database/config";
import { v4 as uuid } from "uuid";
import { Question } from "../models/questions.models";

export class QuestionRepository {
    private questionRepository: any;
    constructor(){
        this.questionRepository = config.getRepository(Question)
    }

    async createQuestion(newQuestion: Question) {
        const id = uuid();
        const question = {
            ...newQuestion,
            id,
        };
        const now = new Date()
        question.createdAt = now; 
        question.updatedAt = now;

        await this.questionRepository.create(question);
        return question;
        
    }

    async getQuestions() {   
        const question = await this.questionRepository.findAll();
        console.log('question:::', question);
        return question;
    }

    async getQuestionById (id: string) {
        const question = await this.questionRepository.findAll({where:{id:id}})
        // console.log(user)
        if(!question[0]){
            throw new Error('question not found')
        }
        return question;
    };


    async updateQuestion(id:string, questionUpdate: Question) {

        questionUpdate.updatedAt = new Date().toISOString();
            const updatedQuestion = await this.questionRepository.update({...questionUpdate}, {
                where: {
                    id: id
                }
            });
      
        return updatedQuestion;
    }

    async deleteQuestion(id:string) {

        const data = await this.questionRepository.destroy({
                where: {
                    id: id
                }
            });
        return data;
    }
} 