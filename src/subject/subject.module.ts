import { Module } from '@nestjs/common';
import { SubjectsService } from './subject.service';
import { SubjectsController } from './subject.controller';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}

