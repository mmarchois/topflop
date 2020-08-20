import {PaginationDto} from 'src/Infrastructure/Common/Dto/PaginationDto';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class UserFiltersDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  public search: string;
}
