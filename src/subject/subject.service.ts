import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  private filePath = path.join(__dirname, '../../data/subjects.json');

  private async readSubjects() {
    const content = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(content);
  }

  private async writeSubjects(data: any) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getSubjectsByStream(stream: 'arts' | 'science') {
    const subjects = await this.readSubjects();
    return subjects[stream] || [];
  }

  async addSubject(stream: 'arts' | 'science', subjectName: string) {
    const subjects = await this.readSubjects();
    const newId = Date.now(); // unique ID
    const newSubject = { id: newId, name: subjectName };

    subjects[stream] = subjects[stream] || [];
    subjects[stream].push(newSubject);

    await this.writeSubjects(subjects);
    return newSubject;
  }

  async updateSubject(stream: 'arts' | 'science', id: number, newName: string) {
    const subjects = await this.readSubjects();
    const list = subjects[stream] || [];
    const index = list.findIndex((s: any) => s.id === id);
    if (index === -1) return { message: 'Subject not found' };

    list[index].name = newName;
    await this.writeSubjects(subjects);
    return list[index];
  }

  async deleteSubject(stream: 'arts' | 'science', id: number) {
    const subjects = await this.readSubjects();
    subjects[stream] = (subjects[stream] || []).filter((s: any) => s.id !== id);
    await this.writeSubjects(subjects);
    return { message: 'Subject deleted successfully' };
  }
}

