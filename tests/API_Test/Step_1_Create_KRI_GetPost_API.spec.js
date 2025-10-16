import { test, expect } from '@playwright/test';
import { createApiContext } from '../../utils/apiClient.js';

const ENV = process.env.ENV || 'dev';  // Default: dev

test.describe('User API Tests', () => {
  // Your Authorization token
    const token = '70cf3764c4fcd912588688dd56ab886b3c970b5524ebb3ab89dad591405331d4';


  let apiContext;

  test.beforeAll(async () => {
    apiContext = await createApiContext(ENV);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
  
  test(`KRI GET /users on ${ENV} environment`, async () => {
    const response = await apiContext.get('/public/v2/users');
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(`✅ Environment: ${ENV}`);
    console.log(data);
  });

  test(`Post /users on ${ENV} environment`, async () => {
    const requestBody = {
      name: 'Tarun Sorari',
      gender: 'Male',
      email: 'tarun52@gmail.com', // must be unique, or API returns 422
      status: 'Active'
    };
    const response = await apiContext.post('/public/v2/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: requestBody
    }
    );
    expect(response.status()).toBe(201);
    console.log('Status:', response.status());
    const data = await response.json();
    console.log(`✅ Environment: ${ENV}`);
    console.log(data);
  });
});
