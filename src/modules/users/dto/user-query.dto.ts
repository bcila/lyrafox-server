import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserQueryDto {
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  take?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  skip?: number;
}
