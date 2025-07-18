import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signup(dto: SignUpDto) {

        const hash = await argon2.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    schoolId: dto.schoolId,
                    email: dto.email,
                    hash,
                },

                select: {
                    schoolId: true,
                    id: true,
                    email: true,
                    createdAt: true,
                }
            });

            return this.signToken(user.id, user.email)

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Este email já está sendo usado'
                    );
                }
                if (error.code === 'P2003') {
                    throw new ForbiddenException(
                        'A escola do usuário não foi encontrada'
                    );
                }
            }
            throw error;
        };
    };

    async signin(dto: SignInDto) {

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

        return this.signToken(user.id, user.email, )
    }

    async signToken(
        userId: number,
        email: string,
        

    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };

        const secret = this.config.getOrThrow('JWT_SECRET');

        const token = await this.jwt.signAsync(payload,
            {
                expiresIn: '25m',
                secret: secret,
            },
        );

        return {
            access_token: token,
        };
    }
}
