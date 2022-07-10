import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { lang } from '../types';

export class WordsFromOnlineTxt {
  @ApiProperty({
    description: 'url to fetch data',
    example: 'https://gitlab.com/d2945/words/-/raw/main/words.txt',
  })
  @IsString()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  url = 'https://gitlab.com/d2945/words/-/raw/main/words.txt';

  @ApiProperty({
    description: 'lang to use',
    example: 'es',
  })
  @IsString()
  lang: lang;
}
