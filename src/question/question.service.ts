import { Question } from "../models/questions.models";
import { QuestionRepository } from "./question.repository";

export class QuestionService {

    private questionRepository: QuestionRepository;

    constructor() {
        this.questionRepository = new QuestionRepository();
    }

    async getQuestions() {
        return await this.questionRepository.getQuestions();
    }

    async getQuestionById(id: string) {
        return await this.questionRepository.getQuestionById(id);
    }

    async createQuestion(course: Question) {
        return await this.questionRepository.createQuestion(course);
    }

    async updateQuestion(id: string, course: Question) {
        return await this.questionRepository.updateQuestion(id,course);
    }

    async deleteQuestion(userId: string) {
        return await this.questionRepository.deleteQuestion(userId);
    }

}