import { ApiResponseProperty } from '@nestjs/swagger';

export class HealthCheckDto {
  @ApiResponseProperty({
    example: 200,
  })
  status: 200;

  @ApiResponseProperty({ example: 'okay' })
  message: 'okay';
}
