import { HttpService } from '@nestjs/axios';
import { Injectable, Logger as LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserData } from '../interface/programmers.interface';

@Injectable()
export class ProgrammersService {
  private readonly PROGRAMMERS_SIGN_IN_URL: string;
  private readonly PROGRAMMERS_RECORD_URL: string;
  private readonly PROGRAMMERS_ID: string;
  private readonly PROGRAMMERS_PW: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
  ) {
    this.PROGRAMMERS_SIGN_IN_URL =
      'https://programmers.co.kr/api/v1/account/sign-in';
    this.PROGRAMMERS_RECORD_URL =
      'https://programmers.co.kr/api/v1/users/record';
    this.PROGRAMMERS_ID =
      this.configService.get<string>('PROGRAMMERS_ID') || '';
    this.PROGRAMMERS_PW =
      this.configService.get<string>('PROGRAMMERS_PW') || '';
  }

  /**
   * 프로그래머스 로그인 메소드
   * @description 프로그래머스 로그인 API 요청의 응답값 중 쿠키를 추출하여 문자열 배열 형태로 반환합니다.
   * @function signInProgrammers
   * @returns {Promise<string[]>}
   */
  async signInProgrammers(): Promise<string[]> {
    try {
      const response = await this.httpService.axiosRef.post(
        this.PROGRAMMERS_SIGN_IN_URL,
        { user: { email: this.PROGRAMMERS_ID, password: this.PROGRAMMERS_PW } },
      );

      this.loggerService.log(
        `✅ Sign in success Programmers (ID: ${this.PROGRAMMERS_ID})`,
      );

      return response.headers['set-cookie'];
    } catch {
      this.loggerService.error(
        `❌ Sign in fail Programmers (ID: ${this.PROGRAMMERS_ID}), Please check your ID or PW Github secret.`,
      );
    }
  }

  /**
   * 프로그래머스 유저 정보 조회 메소드
   * @description 프로그래머스 유저 정보 조회 API를 헤더에 인증 쿠키를 담아 호출하여 유저 정보를 반환합니다.
   * @function getProgrammersRecordInfo
   * @returns {Promise<UserData>}
   */
  async getProgrammersRecordInfo(): Promise<UserData> {
    const cookie: string[] = await this.signInProgrammers();

    try {
      const response = await this.httpService.axiosRef.get(
        this.PROGRAMMERS_RECORD_URL,
        {
          headers: {
            Cookie: cookie.join(';'),
          },
        },
      );

      this.loggerService.log(
        `✅ Data fetching success (ID: ${this.PROGRAMMERS_ID})`,
      );

      return response.data;
    } catch (error) {
      this.loggerService.error(`❌ Data fetching fail. error reason: ${error}`);
    }
  }
}
