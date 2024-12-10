import { Logger as LoggerService, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProgrammersModule } from './programmers/programmers.module';
import { BadgeModule } from './badge/badge.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProgrammersModule,
    BadgeModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
