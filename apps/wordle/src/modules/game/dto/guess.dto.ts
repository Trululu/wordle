import { ApiProperty } from '@nestjs/swagger';
import { lang } from '../../dictionary/types';

export class GuestDto {
  @ApiProperty({ example: `5 letter word` })
  word: string;
  @ApiProperty({ example: 'es' })
  lang: lang;
}
