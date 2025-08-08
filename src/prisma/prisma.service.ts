import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: configService.get<string>('DATABASE_URL'),
                },
            },
        });
    }
}
