import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentService {
  async create(userId: number, studentDto: any): Promise<any> {
    
    return {
      id: userId,
      ...studentDto,
      createdAt: new Date(),
    };
  }

}