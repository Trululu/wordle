import { Body, Controller, Post } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { WordsFromOnlineTxt } from './dto/words-from-online-txt';

@Controller('dictionary')
export class DictionaryController {
  constructor(private service: DictionaryService) {}

  // TODO: protect with admin role
  @Post()
  async loadWordsFromOnlineTXT(@Body() dto: WordsFromOnlineTxt) {
    return this.service.loadWordsFromOnlineTXT(dto);
  }
}
