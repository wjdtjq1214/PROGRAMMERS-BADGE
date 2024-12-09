import { Module } from '@nestjs/common';
import { ProgrammersModule } from '../programmers/programmers.module';
import { BadgeService } from './badge.service';

@Module({
  imports: [ProgrammersModule],
  providers: [BadgeService],
})
export class BadgeModule {}
