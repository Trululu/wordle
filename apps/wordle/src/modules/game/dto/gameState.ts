import { ApiResponseProperty } from '@nestjs/swagger';

class GameLetter {
  @ApiResponseProperty({ example: 'L' })
  letter: string;
  @ApiResponseProperty({ example: 1 })
  value: 1 | 2 | 3;
}

export class GameStateDto {
  @ApiResponseProperty({
    example: [{ letter: 'L', value: 1 }],
    type: Array<GameLetter>,
  })
  response: GameLetter[];

  @ApiResponseProperty({ example: false })
  win: boolean;
}
