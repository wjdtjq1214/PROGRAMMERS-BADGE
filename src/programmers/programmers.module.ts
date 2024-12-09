import { Module } from '@nestjs/common';
import { ProgrammersService } from './programmers.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ProgrammersService],
  exports: [ProgrammersService],
})
export class ProgrammersModule {}
