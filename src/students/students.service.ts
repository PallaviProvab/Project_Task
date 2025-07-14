import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  private readonly filePath = path.join(__dirname, '..', '..', 'data', 'student.json');

  private async readFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await this.writeFile([]);
        return [];
      }
      throw err;
    }
  }

  private async writeFile(data: any) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async findAll() {
    return this.readFile();
  }

  async findOne(id: number) {
    const students = await this.readFile();
    const student = students.find((s: any) => s.id === id);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto) {
    const students = await this.readFile();
    const newStudent = { id: Date.now(), ...dto };
    students.push(newStudent);
    await this.writeFile(students);
    return newStudent;
  }

  async update(id: number, dto: UpdateStudentDto) {
    const students = await this.readFile();
    const index = students.findIndex((s: any) => s.id === id);
    if (index === -1) throw new NotFoundException('Student not found');
    students[index] = { ...students[index], ...dto };
    await this.writeFile(students);
    return students[index];
  }

  async remove(id: number) {
    let students = await this.readFile();
    const exists = students.some((s: any) => s.id === id);
    if (!exists) throw new NotFoundException('Student not found');
    students = students.filter((s: any) => s.id !== id);
    await this.writeFile(students);
    return { message: 'Deleted successfully' };
  }
}
