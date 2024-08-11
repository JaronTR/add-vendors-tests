import { chromium, Browser, BrowserContext } from '@playwright/test';

async function globalSetup() {
  const browser: Browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext({
    userAgent: 'qa-automation-homework',
  });

  // Perform any global setup tasks here, such as logging in
  const page = await context.newPage();
  await page.goto('https://alpha-app.meliopayments.com/login');
  await page.getByTestId('input-email').fill("automation.home@melio.com");
  await page.getByTestId('input-password').fill("vH4iLixIFp");
  await page.getByTestId('button-auth.signIn.buttonLabel').click();

  // Save the state (cookies, localStorage, etc.) to use in tests
  await context.storageState({ path: 'state.json' });

  await browser.close();
}

export default globalSetup;