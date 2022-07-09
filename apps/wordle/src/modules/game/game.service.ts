import { Injectable } from '@nestjs/common';
import { DictionaryService } from '../dictionary/dictionary.service';
import { lang } from '../dictionary/types';

@Injectable()
export class GameService {
  constructor(private dictionaryService: DictionaryService) {}
  async word(lang: lang) {
    return await this.dictionaryService.getWord(lang);
  }
}
