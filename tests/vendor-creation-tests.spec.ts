import {chromium, expect } from '@playwright/test';
import {test} from '../util/test-options'
import user from '../.auth/user.json'
import { PageManager } from '../page-objects/PageManager';
import vendors from '../test-data/vendors.json'


test('Vendor creation', async ({page}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'qa-automation-homework'
  });
  page = await context.newPage();
  //the whole new page context should be in a global setup
  //I didn't have time to configure it properly
  await page.goto('/login');
  const pm = new PageManager(page)
  //pm is already configured in a fixture (test-options.ts)
  //because of the 2nd page context, I had to create a new pageManager
  //but it should have worked properly if the page context was global
  await pm.onLoginPage().login(user.email, user.password)
  await pm.onPaymentPage().clickAddNewVendorButton()
  await pm.onAddVendorPage()
  .addVendor(vendors.HappyFlowVendor['company-name'], vendors.HappyFlowVendor['contact-name'],
     vendors.HappyFlowVendor.email, vendors.HappyFlowVendor['phone-prefix'] + vendors.HappyFlowVendor.phone)
  const vendorResponse = await page.waitForResponse('https://partnerships.alpha.melioservices.com/v1/vendors');
  const vendorResponseBody = await vendorResponse.json();
  const vendorId = vendorResponseBody.data.id;
  await pm.onReceivingMethodPage().clickSkipButton()
  await pm.onPaymentPage().searchVendor(vendors.HappyFlowVendor['company-name'])
  await page.waitForTimeout(2000)
  expect(await pm.onPaymentPage().isVendorExists(vendorId)).toBeTruthy()
  await pm.onPaymentPage().selectVendor(vendorId)
  expect(await pm.onVendorDetailsPage()
  .getBuisnessName()).toEqual(vendors.HappyFlowVendor['company-name'])
  expect(await pm.onVendorDetailsPage()
  .getContactName()).toEqual(vendors.HappyFlowVendor['contact-name'])
  expect(await pm.onVendorDetailsPage()
  .getEmail()).toEqual(vendors.HappyFlowVendor.email)
  expect(await pm.onVendorDetailsPage()
  .getPhoneNumber())
  .toEqual(`${vendors.HappyFlowVendor['phone-prefix']}${vendors.HappyFlowVendor.phone}`)
  //would have liked to create a formatter for the phone number instead
  //should also add a case for an empty phone number (should equal 'Vendor's phone number)  
  //I would have liked to delete the created vendor at the end of the test,
  //as a part of a global teardown
});

test('Vendor form validation', async ({ page }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'qa-automation-homework'
  });
  page = await context.newPage();
  await page.goto('/login');
  const pm = new PageManager(page)
  await pm.onLoginPage().login(user.email, user.password)
  await pm.onPaymentPage().clickAddNewVendorButton()
  await pm.onAddVendorPage()
  .enterBuisnessName(vendors.ErrorStateVendor['company-name'])
  //I would have liked to take an existing vendor from the list,
  //and use its name as the parameter for the enterBuisnessName method
  //that would make sure that the vendor name is already taken
  //didn't have time to implement it, so used a verndor name from the test data that exists 
  await pm.onAddVendorPage()
  .enterEmail(vendors.ErrorStateVendor.email)
  await pm.onAddVendorPage().clickContinueButton()
  await page.waitForTimeout(6000)
  expect(await pm.onAddVendorPage().isEmailErrorVisible()).toBeTruthy()
  await pm.onAddVendorPage().clickContinueButton()
  expect(await pm.onAddVendorPage().isCompanyNameErrorVisible()).toBeTruthy()
  //There are more examples for wrong email inputs,
  //because of lack of time, I'll use only this one. 
  //I would have liked to also test the error message texts
  //I would make a global string file for the error messages (so it could be reused)
});