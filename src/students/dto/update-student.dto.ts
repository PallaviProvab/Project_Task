export class UpdateStudentDto {
  name?: string;
  age?: number;
  rollNo?: string;
  address?: string;
  stream?: 'arts' | 'science';
  subjects?: number[];
}