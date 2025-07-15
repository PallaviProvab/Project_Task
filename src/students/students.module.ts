import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { SubjectsService } from '../subject/subject.service';
import { MarksModule } from '../marks/marks.module';


@Module({
    imports: [MarksModule],
  controllers: [StudentsController],
  providers: [StudentsService, SubjectsService],
})
export class StudentsModule {}

