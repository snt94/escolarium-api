import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsUUID()
    schoolId: string;
}