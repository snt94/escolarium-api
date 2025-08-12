import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserRole } from "common/enums/user-role.enum";
import { StudentService } from "modules/student/student.service";
import { TeacherService } from "modules/teacher/teacher.service";
import { CoordinatorService } from "modules/coordinator/coordinator.service";
@Injectable()
export class UserService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly student: StudentService,
        private readonly teacher: TeacherService,
        private readonly coordinator: CoordinatorService,
    ) { }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(dto: CreateUserDto) {

        const { email, hash, role, schoolId } = dto;

        // Validação manual para o teste unitário
        // Validações manuais necessárias no unitário
        if (!dto.email || !dto.hash || !dto.schoolId) {
            throw new BadRequestException('Missing required fields');
        }

        if (!Object.values(UserRole).includes(dto.role as UserRole)) {
            throw new BadRequestException(`Invalid role: ${dto.role}`);
        }

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
                await this.student.create(user.id, dto.student);
                break;
            case UserRole.TEACHER:
                await this.teacher.create(user.id, dto.teacher);
                break;
            case UserRole.COORDINATOR:
                await this.coordinator.create(user.id, dto.coordinator);
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

