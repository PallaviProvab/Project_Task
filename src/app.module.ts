import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subject/subject.module';
import { MarksModule } from './marks/marks.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [StudentsModule, SubjectsModule, MarksModule, AuthModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
