import { PaginationDto } from 'src/Infrastructure/Common/Dto/PaginationDto';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UserFiltersDto extends PaginationDto {
  @ApiModelPropertyOptional()
  public search: string;
}
