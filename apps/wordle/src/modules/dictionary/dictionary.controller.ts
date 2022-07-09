import { Body, Controller, Get, Post } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { WordsFromOnlineTxt } from './dto/words-from-online-txt';

@Controller('dictionary')
export class DictionaryController {
  constructor(private service: DictionaryService) {}

  @Get()
  async getRandomWord() {
    return this.service.getWord();
  }

  // TODO: protect with admin role
  @Post()
  async loadWordsFromOnlineTXT(@Body() dto: WordsFromOnlineTxt) {
    return this.service.loadWordsFromOnlineTXT(dto);
  }
}
