import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {

        const hash = await argon2.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        });

        return user;
    }

    signin() {
        return { msg: 'Estou logado!' };
    }
}