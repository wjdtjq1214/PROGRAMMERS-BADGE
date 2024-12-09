import { Injectable } from '@nestjs/common';
import { ProgrammersService } from '../programmers/programmers.service';
import * as fs from 'fs';
import * as path from 'path';
import { UserData } from '../interface/programmers.interface';
import { getMiniSvgStr, getFullSvgStr } from './util/svg.util';
import { commitFile } from './util/commit.util';

@Injectable()
export class BadgeService {
  constructor(private readonly programmersService: ProgrammersService) {}

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

    await commitFile();
  }
}
