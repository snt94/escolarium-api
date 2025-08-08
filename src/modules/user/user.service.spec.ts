import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { UserRole } from 'common/enums/user-role.enum';
// Mock do PrismaService
const mockPrisma = {
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
    },
    // outras funções que você usa...
};

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: PrismaService, useValue: mockPrisma },
                // mock outros services se necessário
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um usuário com role STUDENT', async () => {
        mockPrisma.user.create.mockResolvedValue({ id: 'user-id', email: 'test@test.com' });

        const dto = {
            email: 'test@test.com',
            hash: 'hashedpassword',
            schoolId: '12345',
            role: UserRole.STUDENT,
            student: {}
        };

        // Act
        const user = await service.create(dto);

        // Assert
        expect(user).toHaveProperty('id', 'user-id');
        expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
        // verificar chamadas aos serviços de criação dos perfis
    });

});