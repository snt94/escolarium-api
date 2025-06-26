import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {

        const hash = await argon2.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    schoolId: dto.schoolId,
                    email: dto.email,
                    hash,
                },

                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                }
            });

            return user;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Este email já está sendo usado'
                    );
                }
            }
            throw error;
        };
    };

    async signin(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) throw new ForbiddenException(
            'Credenciais incorretas'
        );

        const pwMatches = await argon2.verify(
            user.hash, dto.password
        )

        if (!pwMatches) throw new ForbiddenException(
            'Credenciais incorretas'
        )

        return { msg: 'Estou logado!' };
    }
}
