import config from "../database/config";
import { v4 as uuid } from "uuid";
import { Course } from "../models/courses.models";

export class CourseRepository {
    private courseRepository: any;
    constructor(){
        this.courseRepository = config.getRepository(Course)
    }

    async createCourse(newCourse: Course) {
        const id = uuid();
        const course = {
            ...newCourse,
            id,
        };
        const now = new Date()
        course.createdAt = now;
        course.updatedAt = now;

        await this.courseRepository.create(course);
        return course;
        
    }

    async getCourses() {   
        const course = await this.courseRepository.findAll();
        console.log('course:::', course);
        return course;
    }

    async getCourseById (id: string) {
        const course = await this.courseRepository.findAll({where:{id:id}})
        // console.log(user)
        if(!course[0]){
            throw new Error('course not found')
        }
        return course;
    };


    async updateCourse(id:string,courseUpdate: Course) {

        courseUpdate.updatedAt = new Date().toISOString();
            const updatedCourse = await this.courseRepository.update({...courseUpdate}, {
                where: {
                    id: id
                }
            });
      
        return updatedCourse;
    }

    async deleteCourse(id:string) {

        const data = await this.courseRepository.destroy({
                where: {
                    id: id
                }
            });
        return data;
    }
}