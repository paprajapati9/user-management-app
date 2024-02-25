import { IsInt, Min, Max, IsString, IsIn } from 'class-validator';

export class FetchUsersDto {
  @IsString()
  query: string;

  @IsInt()
  @Min(0)
  offset: number;

  @IsInt()
  @Min(10)
  @Max(100)
  limit: number;

  @IsString()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc';

  @IsString()
  sortKey: string
}