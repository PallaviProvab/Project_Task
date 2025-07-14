import { Injectable } from '@nestjs/common';

@Injectable()
export class MarksService {}
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarksDto } from './dto/create-marks.dto';
import { UpdateMarksDto } from './dto/update-marks.dto';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const MARKS_FILE_PATH = join(__dirname, '../../data/marks.json');

@Injectable()
export class MarksService {
  private readData(): any[] {
    const content = readFileSync(MARKS_FILE_PATH, 'utf-8');
    return JSON.parse(content);
  }

  private writeData(data: any[]): void {
    writeFileSync(MARKS_FILE_PATH, JSON.stringify(data, null, 2));
  }

  findAll(): any[] {
    return this.readData();
  }

  findOne(studentId: number): any {
    const data = this.readData();
    const student = data.find((s) => s.studentId === studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  create(dto: CreateMarksDto): any {
    const data = this.readData();
    if (data.some((s) => s.studentId === dto.studentId)) {
      throw new Error('Student already exists');
    }
    data.push(dto);
    this.writeData(data);
    return dto;
  }

  update(studentId: number, dto: UpdateMarksDto): any {
    const data = this.readData();
    const student = data.find((s) => s.studentId === studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    student.marks = { ...student.marks, ...dto.marks };
    this.writeData(data);
    return student;
  }

  remove(studentId: number): { message: string } {
    const data = this.readData();
    const index = data.findIndex((s) => s.studentId === studentId);
    if (index === -1) {
      throw new NotFoundException('Student not found');
    }
    data.splice(index, 1);
    this.writeData(data);
    return { message: 'Student deleted successfully' };
  }
}
