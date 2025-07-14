import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SubjectsService } from '../subject/subject.service';
import { MarksService } from '../marks/marks.service';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly subjectsService: SubjectsService,
    private readonly marksService: MarksService,
  ) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }

  // ✅ Get full details by student ID (personal + subjects + marks)
  @Get(':id/details')
  async getDetails(@Param('id', ParseIntPipe) id: number) {
    const student = await this.studentsService.findOne(id);
    if (!student) {
      return { message: 'Student not found' };
    }

    const subjects = await this.subjectsService.getSubjectsByStream(student.stream);
    const selectedSubjects = subjects.filter(sub =>
      student.subjects.includes(sub.id),
    );

    const marksRecord = await this.marksService.findOne(id);

    return {
      personal: student,
      subjects: selectedSubjects,
      marks: marksRecord?.marks || {},
    };
  }
}
