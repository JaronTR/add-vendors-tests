import {Browser, BrowserContext, chromium, test as setup} from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user-state.json'

setup('auth', async ({request}) => {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext({
      userAgent: 'qa-automation-homework'
    });
  
    const page = await context.newPage();
    await page.goto('https://alpha-app.meliopayments.com/login');
    await page.getByTestId('input-email').fill(user.email);
    await page.getByTestId('input-password').fill(user.password);
    await page.getByTestId('button-auth.signIn.buttonLabel').click();
    await context.storageState({ path: authFile });
    
})