import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadgeService } from './badge/badge.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const badgeService = app.get(BadgeService);

  await badgeService.createBadge();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
