import { IsIn, IsString, IsOptional } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsIn(['arts', 'science'])
  stream?: 'arts' | 'science';

  @IsOptional()
  @IsString()
  name?: string;
}