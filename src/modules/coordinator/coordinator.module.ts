import { Module } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorController } from './coordinator.controller';

@Module({
    controllers: [CoordinatorController],
    providers: [CoordinatorService],
    exports: [CoordinatorService]
})
export class CoordinatorModule { }
