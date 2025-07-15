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


@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly subjectsService: SubjectsService
   
  ) {}

  @Get('allstudents')
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Post('create')
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete('delete/:id')
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

  

    return {
      personal: student,
      subjects: selectedSubjects,
      
    };
  }
}
