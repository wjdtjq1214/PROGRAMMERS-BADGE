import { Injectable, Logger as LoggerService } from '@nestjs/common';
import { ProgrammersService } from '../programmers/programmers.service';
import * as fs from 'fs';
import * as path from 'path';
import { UserData } from '../interface/programmers.interface';
import { getMiniSvgStr, getFullSvgStr } from './util/svg.util';
import { commitFile } from './util/commit.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BadgeService {
  private readonly GH_REPOSITORY: string;
  private readonly GH_PAT: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly programmersService: ProgrammersService,
  ) {
    this.GH_REPOSITORY = this.configService.get<string>('GH_REPOSITORY');
    this.GH_PAT = this.configService.get<string>('GH_PAT');
  }

  async createBadge(): Promise<void> {
    const userData: UserData =
      await this.programmersService.getProgrammersRecordInfo();

    const miniSvgStr: string = getMiniSvgStr(userData);
    const fullSvgStr: string = getFullSvgStr(userData);

    const staticDir = path.join(__dirname, '../../static');
    const miniSvgPath = path.join(staticDir, 'result_mini.svg');
    const fullSvgPath = path.join(staticDir, 'result_full.svg');

    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }

    fs.writeFileSync(miniSvgPath, miniSvgStr);
    fs.writeFileSync(fullSvgPath, fullSvgStr);

    this.loggerService.log('✅ Create Programmers badge success');

    await commitFile(this.GH_REPOSITORY, this.GH_PAT);
  }
}
