import { Role } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEmail, IsString, IsEnum, ValidateNested } from "class-validator";
import { CreateCoordinatorDto } from 'modules/coordinator/dto/create-coordinator.dto';
import { CreateStudentDto } from 'modules/student/dto';
import { CreateTeacherDto } from 'modules/teacher/dto/create-teacher.dto';  

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    hash: string;

    @IsString()
    schoolId: string;
    
    @IsEnum(Role, { message: 'Cargo Inválido.'})
    role: Role;

    @ValidateNested()
    @Type(() => CreateStudentDto)
    student?: CreateStudentDto;

    @ValidateNested()
    @Type(() => CreateTeacherDto)
    teacher?: CreateTeacherDto;

    @ValidateNested()
    @Type(() => CreateCoordinatorDto)
    coordinator?: CreateCoordinatorDto;
}