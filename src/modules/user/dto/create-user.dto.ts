import { Type } from "class-transformer";
import { IsEmail, IsString, IsEnum, ValidateNested } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    hash: string;

    @IsString()
    schoolId: string;
    
    @IsEnum(Role)
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