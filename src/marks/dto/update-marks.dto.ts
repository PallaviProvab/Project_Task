import { IsDefined, IsObject } from 'class-validator';

export class UpdateMarksDto {
  @IsDefined()
  @IsObject()
  marks: { [subjectId: string]: number };
}
