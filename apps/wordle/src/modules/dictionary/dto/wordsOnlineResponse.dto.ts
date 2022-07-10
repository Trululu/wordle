import { ApiResponseProperty } from '@nestjs/swagger';

export class WordsOnlineResponse {
  @ApiResponseProperty({
    example: true,
  })
  succes = true;

  @ApiResponseProperty({
    example: 'file loaded into db',
  })
  message: 'file loaded into db';
}
