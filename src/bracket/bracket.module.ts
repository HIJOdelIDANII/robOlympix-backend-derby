import { Module } from '@nestjs/common';
import { BracketService } from './bracket.service';
import { BracketController } from './bracket.controller';

@Module({
  providers: [BracketService],
  controllers: [BracketController]
})
export class BracketModule {}
