import { Logger as LoggerService, Module } from '@nestjs/common';
import { ProgrammersService } from './programmers.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ProgrammersService, LoggerService],
  exports: [ProgrammersService],
})
export class ProgrammersModule {}
