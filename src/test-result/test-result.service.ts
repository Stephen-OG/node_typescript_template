import { TestResult } from "../models/test-results.models";
import { TestResultRepository } from "./test-result.repository";

export class TestResultService {

    private testResultRepository: TestResultRepository;

    constructor() {
        this.testResultRepository = new TestResultRepository();
    }

    async getTestResults() {
        return await this.testResultRepository.getTestResults();
    }

    async getTestResultById(id: string) {
        return await this.testResultRepository.getTestResultById(id);
    }

    async createTestResult(test: TestResult) {
        return await this.testResultRepository.createTestResult(test);
    }

    async updateTestResult(id: string, test: TestResult) {
        return await this.testResultRepository.updateTestResult(id,test);
    }

    async deleteTestResult(testId: string) {
        return await this.testResultRepository.deleteTestResult(testId);
    }

}