import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { MarksController } from './marks/marks.controller';
import { MarksService } from './marks/marks.service';
import { MarksModule } from './marks/marks.module';
import { SubjectsModule } from './subject/subject.module';
import { SubjectsController } from './subject/subject.controller';
import { SubjectsService } from './subject/subject.service';

@Module({
  imports: [StudentsModule, MarksModule, SubjectsModule],
  controllers: [AppController, MarksController, SubjectsController],
  providers: [AppService, MarksService, SubjectsService],
})
export class AppModule {}
