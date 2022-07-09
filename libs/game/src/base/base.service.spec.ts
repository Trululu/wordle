import { Test, TestingModule } from '@nestjs/testing';
import { BaseGameService } from './base.service';

describe('GameService', () => {
  let service: BaseGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseGameService],
    }).compile();

    service = module.get<BaseGameService>(BaseGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
