import { exit } from 'process';
import { warning } from '../logger';

function checkEnv(envName: string): void {
  if (!process.env[envName]) {
    warning(`${envName} environment variable is missing`);
    exit(1);
  }
}

export function checkEnvironmentVariable(requiredEnvArr: string[]): void {
  requiredEnvArr.forEach((envName) => {
    checkEnv(envName);
  });
}
