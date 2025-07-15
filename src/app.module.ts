import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subject/subject.module';
import { MarksModule } from './marks/marks.module';


@Module({
  imports: [StudentsModule, SubjectsModule, MarksModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
