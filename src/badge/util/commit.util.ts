import { spawn } from 'child_process';

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

export const commitFile = async (
  GITHUB_REPOSITORY: string,
  GH_PAT: string,
): Promise<void> => {
  if (!GITHUB_REPOSITORY || !GH_PAT) {
    throw new Error('GITHUB_REPOSITORY or GH_PAT is not .env setting.');
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
    `https://${GH_PAT}@github.com/${GITHUB_REPOSITORY}.git`,
  ]);
};
