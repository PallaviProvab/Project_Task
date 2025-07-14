export class CreateStudentDto {
  name: string;
  age: number;
  rollNo: string;
  address: string;
  stream: 'arts' | 'science';
  subjectIds: number[]; // IDs of subjects assigned to this student
}