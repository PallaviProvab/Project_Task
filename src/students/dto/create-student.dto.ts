import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsIn,
  ArrayNotEmpty,
  IsInt,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  age: number;

  @IsString()
  @IsNotEmpty()
  rollNo: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsIn(['arts', 'science'])
  stream: 'arts' | 'science';

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  subjectIds: number[];
}
