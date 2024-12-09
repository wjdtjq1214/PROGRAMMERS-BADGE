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

export const commitFile = async (): Promise<void> => {
  await execCmd('git', [
    'config',
    '--global',
    'user.email',
    'github-programmers-rank@example.com',
  ]);
  await execCmd('git', [
    'config',
    '--global',
    'user.name',
    'github-programmers-rank[bot]',
  ]);
  await execCmd('git', ['add', '.']);
  await execCmd('git', [
    'commit',
    '-m',
    '깃허브의 프로그래머스 순위를 나타내는 지표를 svg 형식으로 제공합니다.',
  ]);
  await execCmd('git', ['push']);
};
