import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getStatus() {
    return {
      status: 200,
      message: 'okay',
    };
  }
}
