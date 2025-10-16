import path from 'path';
import { request } from '@playwright/test';
import fs from 'fs';

export async function createApiContext(env) {
 const configPath = path.resolve('config', `${env}.env.json`);
 console.log("config path ="+configPath);

  if (!fs.existsSync(configPath)) {
    throw new Error(`❌ Config file not found for environment: ${env}`);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
console.log(config.authToken);
  const apiContext = await request.newContext({
    baseURL: config.baseURL,
  });

  return apiContext;
}