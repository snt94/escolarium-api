import { Injectable } from "@nestjs/common";

@Injectable()
export class CoordinatorService {
    async create(userId: number, coordinatorDto: any): Promise<any> {
        return {
            id: userId,
            ...coordinatorDto,
            createdAt: new Date(),
        };
    }
}