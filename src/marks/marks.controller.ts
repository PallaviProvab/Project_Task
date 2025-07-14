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
import { MarksService } from './marks.service';
import { CreateMarksDto } from './dto/create-marks.dto';
import { UpdateMarksDto } from './dto/update-marks.dto';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Get()
  findAll() {
    return this.marksService.findAll();
  }

  @Get(':studentId')
  findOne(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.marksService.findOne(studentId);
  }

  @Post()
  create(@Body() dto: CreateMarksDto) {
    return this.marksService.create(dto);
  }

  @Put(':studentId')
  update(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() dto: UpdateMarksDto,
  ) {
    return this.marksService.update(studentId, dto);
  }

  @Delete(':studentId')
  remove(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.marksService.remove(studentId);
  }
}
