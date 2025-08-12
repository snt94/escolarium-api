import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StudentModule } from 'modules/student/student.module';
import { CoordinatorModule } from 'modules/coordinator/coordinator.module';
import { TeacherModule } from 'modules/teacher/teacher.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CoordinatorModule, TeacherModule, StudentModule]
})
export class UserModule {}
