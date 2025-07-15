import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateMarkDto } from './dto/create-marks.dto';

@Injectable()
export class MarksService {
  private filePath = path.join(__dirname, '../../data/marks.json');

  private async readMarks() {
    const content = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(content);
  }

  private async writeMarks(data: any) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // ✅ Add new mark (prevent duplicates)
  async addMark(dto: CreateMarkDto) {
    const marks = await this.readMarks();

    const duplicate = marks.find(
      (m: any) =>
        m.studentId === dto.studentId && m.subjectId === dto.subjectId,
    );

    if (duplicate) {
      return { message: 'Mark for this subject already exists for the student' };
    }

    marks.push(dto);
    await this.writeMarks(marks);
    return dto;
  }

  // ✅ Get all marks of a student
  async getMarksByStudent(studentId: number) {
    const marks = await this.readMarks();
    return marks.filter((m: any) => m.studentId === studentId);
  }

  // ✅ Get all marks (raw)
  async getAllMarks() {
    return this.readMarks();
  }

  // ✅ Update marks for a student and subject
 async updateMark(studentId: number, subjectId: number, newMarks: number) {
  const marks = await this.readMarks();
  const index = marks.findIndex(
    (m: any) => m.studentId === studentId && m.subjectId === subjectId,
  );

  if (index === -1) {
    return { message: 'Mark not found for this student and subject' };
  }

  marks[index].marks = newMarks;
  await this.writeMarks(marks);
  return marks[index];
}
}
