import { test, expect } from '@playwright/test';
import { createApiContext } from '../../utils/apiClient.js';

const ENV = process.env.ENV || 'E1';  // Default: E1

test.describe('GAR_DDW Regresstion API Test', () => {
  
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await createApiContext(ENV);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  
  test(`Case GET /users on ${ENV} environment`, async () => {
    const response = await apiContext.get('/public/v2/users');
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(`✅ Environment: ${ENV}`);
    console.log(data);
  });
  
});
