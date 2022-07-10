import { ApiResponseProperty } from '@nestjs/swagger';

export class GameSuccessDto {
  @ApiResponseProperty({ example: true })
  success: true;
  @ApiResponseProperty({ example: `wait 400 until the next word` })
  message: string;
  @ApiResponseProperty({ example: false })
  win: boolean;
}
