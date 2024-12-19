import { test, expect } from '@playwright/test';
import { login } from './utils';

const user = {
  email: 'vitanas-pl@mamamia.app', 
  password: 'test', 
  url: '**/caregiver-agency/dashboard'
};

test('Job count check', async ({ page }) => {
  await login(page, user.email, user.password, user.url);

  
});