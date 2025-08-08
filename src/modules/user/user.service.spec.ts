import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { TeacherService } from '../teacher/teacher.service'
import { StudentService } from '../student/student.service'
import { UserRole } from 'common/enums/user-role.enum';
import { CoordinatorService } from 'modules/coordinator/coordinator.service';

// Mocks
const mockPrisma = {
    user: {
        create: jest.fn(),
        findUnique: jest.fn(),
    },
};
const mockStudentService = {
    create: jest.fn(),
};

const mockTeacherService = {
    create: jest.fn(),
};

const mockCoordinatorService = {
    create: jest.fn(),
};

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: PrismaService, useValue: mockPrisma },
                { provide: TeacherService, useValue: mockTeacherService },
                { provide: StudentService, useValue: mockStudentService },
                { provide: CoordinatorService, useValue: mockCoordinatorService },
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

        const user = await service.create(dto);

        expect(user).toHaveProperty('id', 'user-id');
        expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
        expect(mockStudentService.create).toHaveBeenCalledWith('user-id', dto.student);  // verifica se chamou o mock
    });

});