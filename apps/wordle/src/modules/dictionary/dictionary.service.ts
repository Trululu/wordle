import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordsFromOnlineTxt } from './dto/words-from-online-txt';
import { Dictionary } from './entities/dictionary.entity';

@Injectable()
export class DictionaryService {
  private readonly logger = new Logger(DictionaryService.name);
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Dictionary)
    private directoryRepo: Repository<Dictionary>,
  ) {}

  async getWord() {
    const data = await this.directoryRepo
      .createQueryBuilder('word')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
    this.logger.log(`sending word ${data}`);
    return data;
  }

  async loadWordsFromOnlineTXT(dto: WordsFromOnlineTxt) {
    let { data } = await this.httpService.get(dto.url).toPromise();
    data = data.replace(/(\r\n|\n|\r)/gm, '||').split('||');
    for (let i = 0; i < data.length; i++) {
      const word = data[i];
      if (word.length === 5) {
        await this.directoryRepo
          .create({
            lang: dto.lang,
            source: dto.url,
            word,
          })
          .save();
      }
    }
    this.logger.log('data saved');
    return {
      succes: true,
      message: 'file loaded into db',
    };
  }
}
