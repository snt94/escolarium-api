import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserRole } from "common/enums/user-role.enum";
@Injectable()
export class UserService {

    studentService: any;
    teacherService: any;
    coordinatorService: any;

    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(dto: CreateUserDto) {

        const { email, hash, role, schoolId } = dto;

        const user = await this.prisma.user.create({
            data: {
                email,
                hash,
                role,
                schoolId,
            },
        });

        switch (role) {
            case UserRole.STUDENT:
                await this.studentService.create(user.id, dto.student);
                break;
            case UserRole.TEACHER:
                await this.teacherService.create(user.id, dto.teacher);
                break;
            case UserRole.COORDINATOR:
                await this.coordinatorService.create(user.id, dto.coordinator);
                break;
        }

        return user;
    }

    async update(id: number, data: UpdateUserDto) {
        return this.prisma.user.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}

