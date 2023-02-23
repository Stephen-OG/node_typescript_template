import config from "../database/config";
import { v4 as uuid } from "uuid";
import { TestResult } from "../models/test-results.models";

export class TestResultRepository {
    private testResultRepository: any;
    constructor(){
        this.testResultRepository = config.getRepository(TestResult)
    }

    async createTestResult(newTest: TestResult) {
        const id = uuid();
        const test = {
            ...newTest,
            id,
        };
        const now = new Date()
        test.createdAt = now; 
        test.updatedAt = now;

        await this.testResultRepository.create(test);
        return test;
        
    }

    async getTestResults() {   
        const test = await this.testResultRepository.findAll();
        console.log('test:::', test);
        return test;
    }

    async getTestResultById (id: string) {
        const test = await this.testResultRepository.findAll({where:{id:id}})
        // console.log(user)
        if(!test[0]){
            throw new Error('question not found')
        }
        return test;
    };


    async updateTestResult(id:string, testUpdate: TestResult) {

        testUpdate.updatedAt = new Date().toISOString();
            const updatedTest = await this.testResultRepository.update({...testUpdate}, {
                where: {
                    id: id
                }
            });
      
        return updatedTest;
    }

    async deleteTestResult(id:string) {

        const data = await this.testResultRepository.destroy({
                where: {
                    id: id
                }
            });
        return data;
    }
} 