import { spawnSync } from 'child_process';
import path from 'path';
import { getEnvironmentConfig } from '../config/environment';

const config = getEnvironmentConfig();
const featureTags = config.featureTags?.trim();

const cucumberArgs = [
  'cucumber-js',
  '--require-module',
  'ts-node/register',
  '--require',
  'features/**/*.ts',
  '--format',
  'progress',
];

if (featureTags) {
  cucumberArgs.push('--tags', featureTags);
}

cucumberArgs.push('features');

const result = spawnSync('npx', cucumberArgs, {
  cwd: path.resolve(process.cwd()),
  stdio: 'inherit',
  shell: true,
});

if (result.error) {
  console.error('Failed to execute cucumber-js:', result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
