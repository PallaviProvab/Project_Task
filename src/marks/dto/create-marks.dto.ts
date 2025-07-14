import { IsDefined, IsNumber, IsObject } from 'class-validator';

export class CreateMarksDto {
  @IsDefined()
  @IsNumber()
  studentId: number;

  @IsDefined()
  @IsObject()
  marks: { [subjectId: string]: number };
}
