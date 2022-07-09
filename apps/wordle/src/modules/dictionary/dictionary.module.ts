import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { RedisCacheModule } from '@app/common-modules';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Dictionary]),
    RedisCacheModule.create('redis.cache'),
  ],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
