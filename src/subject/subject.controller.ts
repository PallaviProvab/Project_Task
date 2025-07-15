import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SubjectsService } from './subject.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  // 🔹 Get all subjects (arts + science)
  @Get('all')
  getAllSubjects(@Query('sortBy') sortBy: 'id' | 'name' = 'id') {
    return this.subjectsService.getAllSubjects(sortBy);
  }

  // 🔹 Get subjects by stream
  @Get('get/:stream')
  getSubjects(@Param('stream') stream: 'arts' | 'science') {
    return this.subjectsService.getSubjectsByStream(stream);
  }

  // 🔹 Create a subject
  @Post('create')
  createSubject(
    @Body() body: { stream: 'arts' | 'science'; name: string },
  ) {
    return this.subjectsService.addSubject(body.stream, body.name);
  }

  // 🔹 Update subject by stream and ID
  @Put('update/:stream/:id')
  updateSubject(
    @Param('stream') stream: 'arts' | 'science',
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string },
  ) {
    return this.subjectsService.updateSubject(stream, id, body.name);
  }

  // 🔹 Delete subject
  @Delete('delete/:stream/:id')
  deleteSubject(
    @Param('stream') stream: 'arts' | 'science',
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.subjectsService.deleteSubject(stream, id);
  }
}
