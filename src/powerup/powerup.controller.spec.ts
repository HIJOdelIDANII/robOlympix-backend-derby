import { Test, TestingModule } from '@nestjs/testing';
import { PowerupController } from './powerup.controller';

describe('PowerupController', () => {
  let controller: PowerupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PowerupController],
    }).compile();

    controller = module.get<PowerupController>(PowerupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
