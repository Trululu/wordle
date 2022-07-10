import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckDto } from './dto/HealthCheckDto.dto';
import { HealthCheckService } from './health-check.service';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return service status',
    type: HealthCheckDto,
  })
  getStatus() {
    return this.healthCheckService.getStatus();
  }
}
