import { spawn } from 'child_process';

/**
 * CLI 명령어를 실행합니다.
 * @description CLI 명령어를 실행하고 종료 코드를 반환합니다.
 * @param cmd 명령어
 * @param args 명령어 인자
 * @returns {Promise<number>}
 */
export const execCmd = async (
  cmd: string,
  args: string[] = [],
): Promise<number> => {
  return new Promise((resolve, reject) => {
    const app = spawn(cmd, args, { stdio: 'pipe' });
    let stdout = '';

    app.stdout.on('data', (data: Buffer) => {
      stdout = data.toString();
    });

    app.on('close', (code: number) => {
      if (code !== 0 && !stdout.includes('nothing to commit')) {
        reject(
          new Error(
            `${cmd} ${args.join(' ')} \n ${stdout} \n Invalid status code: ${code}`,
          ),
        );
        return;
      }
      resolve(code);
    });

    app.on('error', reject);
  });
};

/**
 * 생성된 .svg 파일을 Github 저장소에 업로드합니다.
 * @description Git 명령어를 이용하여 'PROGRAMMERS-BADGE [BOT]' 유저명으로 자동으로 커밋합니다.
 * @param GH_REPOSITORY Github Repository
 * @param GH_PAT Github Personal Access Token
 * @returns {Promise<void>}
 */
export const commitFile = async (
  GH_REPOSITORY: string,
  GH_PAT: string,
): Promise<void> => {
  if (!GH_REPOSITORY || !GH_PAT) {
    throw new Error('GH_REPOSITORY or GH_PAT is not .env setting.');
  }

  await execCmd('git', [
    'config',
    '--global',
    'user.email',
    'JH8459@example.com',
  ]);

  await execCmd('git', [
    'config',
    '--global',
    'user.name',
    'PROGRAMMERS-BADGE [BOT]',
  ]);

  await execCmd('git', ['add', '.']);

  await execCmd('git', [
    'commit',
    '-m',
    '깃허브의 프로그래머스 순위를 나타내는 지표를 svg 형식으로 제공합니다.',
  ]);

  await execCmd('git', [
    'push',
    `https://${GH_PAT}@github.com/${GH_REPOSITORY}.git`,
  ]);
};
