import { Logger as LoggerService, Module } from '@nestjs/common';
import { ProgrammersModule } from '../programmers/programmers.module';
import { BadgeService } from './badge.service';

@Module({
  imports: [ProgrammersModule],
  providers: [BadgeService, LoggerService],
})
export class BadgeModule {}
