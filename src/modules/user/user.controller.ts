import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard"
import { GetUser } from "./decorators/get-user.decorator";
import { User } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(+id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(+id);
    }
}