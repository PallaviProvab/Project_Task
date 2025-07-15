import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { SubjectsService } from '../subject/subject.service';


@Module({
  controllers: [StudentsController],
  providers: [StudentsService, SubjectsService],
})
export class StudentsModule {}

