import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma.service';
import { TeacherService } from '../teacher/teacher.service';
import { StudentService } from '../student/student.service';
import { CoordinatorService } from '../coordinator/coordinator.service';
import { UserRole } from 'common/enums/user-role.enum';
import { BadRequestException } from '@nestjs/common';

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
        { provide: StudentService, useValue: mockStudentService },
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: CoordinatorService, useValue: mockCoordinatorService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um usuário STUDENT e chamar StudentService.create', async () => {
      mockPrisma.user.create.mockResolvedValue({ id: 'user-id', email: 'student@test.com' });

      const dto = {
        email: 'student@test.com',
        hash: 'hashedpassword',
        schoolId: '12345',
        role: UserRole.STUDENT,
        student: { grade: '10th' },
      };

      const user = await service.create(dto);

      expect(user).toHaveProperty('id', 'user-id');
      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
      expect(mockStudentService.create).toHaveBeenCalledWith('user-id', dto.student);
    });

    it('deve criar um usuário TEACHER e chamar TeacherService.create', async () => {
      mockPrisma.user.create.mockResolvedValue({ id: 'teacher-id', email: 'teacher@test.com' });

      const dto = {
        email: 'teacher@test.com',
        hash: 'hashedpassword',
        schoolId: '12345',
        role: UserRole.TEACHER,
        teacher: { subject: 'Math' },
      };

      const user = await service.create(dto);

      expect(user).toHaveProperty('id', 'teacher-id');
      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
      expect(mockTeacherService.create).toHaveBeenCalledWith('teacher-id', dto.teacher);
    });

    it('deve criar um usuário COORDINATOR e chamar CoordinatorService.create', async () => {
      mockPrisma.user.create.mockResolvedValue({ id: 'coord-id', email: 'coord@test.com' });

      const dto = {
        email: 'coord@test.com',
        hash: 'hashedpassword',
        schoolId: '12345',
        role: UserRole.COORDINATOR,
        coordinator: { department: 'Science' },
      };

      const user = await service.create(dto);

      expect(user).toHaveProperty('id', 'coord-id');
      expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
      expect(mockCoordinatorService.create).toHaveBeenCalledWith('coord-id', dto.coordinator);
    });

    it('deve lançar BadRequestException para role inválido', async () => {
      const dto = {
        email: 'invalid@test.com',
        hash: 'hashedpassword',
        schoolId: '12345',
        role: 'INVALID_ROLE' as UserRole,
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('deve lançar BadRequestException se faltar dados obrigatórios', async () => {
      const dto = {
        email: '',
        hash: '',
        schoolId: '',
        role: UserRole.STUDENT,
      };

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });
});
