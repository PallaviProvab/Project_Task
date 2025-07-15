import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

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
    const list = subjects[stream] || [];
    return list.sort((a: any, b: any) => a.id - b.id);
  }
async getAllSubjects(sortBy: 'id' | 'name' = 'id') {
  const subjects = await this.readSubjects();
  const sortFn =
    sortBy === 'name'
      ? (a: any, b: any) => a.name.localeCompare(b.name)
      : (a: any, b: any) => a.id - b.id;

  return {
    arts: (subjects.arts || []).sort(sortFn),
    science: (subjects.science || []).sort(sortFn),
  };
}

  async addSubject(stream: 'arts' | 'science', subjectName: string) {
    const subjects = await this.readSubjects();
    subjects[stream] = subjects[stream] || [];
    const existingSubjects = subjects[stream];

    // 🚫 Check for duplicate
    const duplicate = existingSubjects.find(
      (s: any) => s.name.toLowerCase() === subjectName.toLowerCase(),
    );
    if (duplicate) {
      return { message: `Subject "${subjectName}" already exists in ${stream}` };
    }

    // ✅ Assign stream-specific ID
    let baseId = stream === 'arts' ? 101 : 201;
    let newId = baseId;

    if (existingSubjects.length > 0) {
      const maxId = Math.max(...existingSubjects.map((s: any) => s.id));
      newId = maxId + 1;
    }

    const newSubject = { id: newId, name: subjectName };
    existingSubjects.push(newSubject);

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
    const originalLength = (subjects[stream] || []).length;

    subjects[stream] = (subjects[stream] || []).filter(
      (s: any) => s.id !== id,
    );

    if (subjects[stream].length === originalLength) {
      return { message: 'Subject not found or already deleted' };
    }

    await this.writeSubjects(subjects);
    return { message: 'Subject deleted successfully' };
  }
}
