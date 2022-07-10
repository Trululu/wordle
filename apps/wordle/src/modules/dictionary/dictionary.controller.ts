import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DictionaryService } from './dictionary.service';
import { WordsFromOnlineTxt } from './dto/words-from-online-txt';
import { WordsOnlineResponse } from './dto/wordsOnlineResponse.dto';

@ApiTags('Dictionary')
@Controller('dictionary')
export class DictionaryController {
  constructor(private service: DictionaryService) {}

  // TODO: protect with admin role
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Loads data from a txt url',
    type: WordsOnlineResponse,
  })
  async loadWordsFromOnlineTXT(@Body() dto: WordsFromOnlineTxt) {
    return this.service.loadWordsFromOnlineTXT(dto);
  }
}
