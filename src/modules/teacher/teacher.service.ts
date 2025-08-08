import { Injectable } from "@nestjs/common";

@Injectable()
export class TeacherService {
    async create(userId: number, teacherDto: any): Promise<any> {
        return {
            id: userId,
            ...teacherDto,
            createdAt: new Date(),
        };
    }
}