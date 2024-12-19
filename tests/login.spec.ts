import { test, expect } from '@playwright/test';
import { login } from './utils';
const users = [
  { email: 'cga@cga.pl', password: 'test', url: '**/caregiver-agency/dashboard' },
  { email: 'cg@cg.pl', password: 'test', url: '**/caregiver/jobs' },
  { email: 'sa@sa.pl', password: 'test', url: '**/service-agency/dashboard' },
  { email: 'customer@customer.pl', password: 'test', url: '**/customer/caregivers' }
];

test.describe('Login for all roles', () => {
  for (const user of users) {
    test(`login for ${user.email}`, async ({ page }) => {
      await login(page, user.email, user.password, user.url);
    });
  }
});