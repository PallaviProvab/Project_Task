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
import { SubjectsService } from './subject.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  // Get all subjects by stream
  @Get(':stream')
  getSubjects(@Param('stream') stream: 'arts' | 'science') {
    return this.subjectsService.getSubjectsByStream(stream);
  }

  // Create subject
  @Post()
  createSubject(
    @Body() body: { stream: 'arts' | 'science'; name: string },
  ) {
    return this.subjectsService.addSubject(body.stream, body.name);
  }

  // Update subject
  @Put(':stream/:id')
  updateSubject(
    @Param('stream') stream: 'arts' | 'science',
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string },
  ) {
    return this.subjectsService.updateSubject(stream, id, body.name);
  }

  // Delete subject
  @Delete(':stream/:id')
  deleteSubject(
    @Param('stream') stream: 'arts' | 'science',
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.subjectsService.deleteSubject(stream, id);
  }
}
