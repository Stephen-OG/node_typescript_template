import { Course } from "../models/courses.models";
import { User } from "../models/users.models";
import { CourseRepository } from "./course.repository";

export class CourseService {

    private courseRepository: CourseRepository;

    constructor() {
        this.courseRepository = new CourseRepository();
    }

    async getCourses() {
        return await this.courseRepository.getCourses();
    }

    async getCourseById(id: string) {
        return await this.courseRepository.getCourseById(id);
    }

    async createCourse(course: Course) {
        return await this.courseRepository.createCourse(course);
    }

    async updateCourse(id: string, course: Course) {
        return await this.courseRepository.updateCourse(id,course);
    }

    async deleteCourse(userId: string) {
        return await this.courseRepository.deleteCourse(userId);
    }

}