import { ApiProperty } from '@nestjs/swagger';
import { lang } from '../types';

export class WordsFromOnlineTxt {
  @ApiProperty({
    description: 'url to fetch data',
    example: 'https://gitlab.com/d2945/words/-/raw/main/words.txt',
  })
  url = 'https://gitlab.com/d2945/words/-/raw/main/words.txt';

  @ApiProperty({
    description: 'lang to use',
    example: 'es',
  })
  lang: lang;
}
