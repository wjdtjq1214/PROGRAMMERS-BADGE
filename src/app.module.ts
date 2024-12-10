import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProgrammersModule } from './programmers/programmers.module';
import { BadgeModule } from './badge/badge.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProgrammersModule,
    BadgeModule,
  ],
})
export class AppModule {}
