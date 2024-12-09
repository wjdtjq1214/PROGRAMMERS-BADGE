import { Injectable } from '@nestjs/common';
import { ProgrammersService } from '../programmers/programmers.service';
import * as fs from 'fs';
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

    fs.writeFileSync(__dirname + '/result_mini.svg', miniSvgStr);
    fs.writeFileSync(__dirname + '/result_full.svg', fullSvgStr);

    await commitFile();
  }
}
