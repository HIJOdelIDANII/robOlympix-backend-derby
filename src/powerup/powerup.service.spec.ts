import { Test, TestingModule } from '@nestjs/testing';
import { PowerupService } from './powerup.service';

describe('PowerupService', () => {
  let service: PowerupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PowerupService],
    }).compile();

    service = module.get<PowerupService>(PowerupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
