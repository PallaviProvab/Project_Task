import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subject/subject.module';


@Module({
  imports: [StudentsModule, SubjectsModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
