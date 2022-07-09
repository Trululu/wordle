import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class TypeormConnectionModule {
  static create(param: string): DynamicModule {
    return {
      module: TypeOrmModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => config.get(param),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
