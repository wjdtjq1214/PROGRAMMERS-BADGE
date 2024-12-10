interface SkillCheck {
  level: number;
}

interface Ranking {
  score: number;
  rank: number;
}

interface CodingTest {
  solved: number;
  total: number;
}

interface Career {
  developmentDuration: number;
  score: number;
}

/**
 * 프로그래머스 유저 데이터 인터페이스
 * @interface UserData
 * @property {string} name 이름
 * @property {number} registerPeriod 가입 기간
 * @property {SkillCheck} skillCheck 스킬 체크 정보
 * @property {Ranking} ranking 랭킹 정보
 * @property {CodingTest} codingTest 코딩 테스트 정보
 * @property {Career} career 경력 정보
 */
export interface UserData {
  name: string;
  registerPeriod: number;
  skillCheck: SkillCheck;
  ranking: Ranking;
  codingTest: CodingTest;
  career: Career;
}
