import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';
import { lang } from '../../dictionary/types';

export class GuestDto {
  @ApiProperty({ example: `5 letter word` })
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  word: string;

  @ApiProperty({ example: 'es' })
  @IsString()
  lang: lang;
}
