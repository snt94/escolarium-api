import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard"
import { GetUser } from "./decorators/get-user.decorator";
import { User } from "generated/prisma";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: User){

        return user;

    }
}