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

export interface UserData {
  name: string;
  registerPeriod: number;
  skillCheck: SkillCheck;
  ranking: Ranking;
  codingTest: CodingTest;
  career: Career;
}
