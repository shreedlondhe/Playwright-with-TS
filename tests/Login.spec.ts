import { test, expect } from "../fixtures/custom-fixtures"; import { credentials } from "../utils/test-data";



test('Test 01 Bid Creation', async ({ loginPage, createBid, vendorSubmission }) => {
   await loginPage.goto();
   await loginPage.loginToApplication(credentials.email_ssd, credentials.password);
   await createBid.createBid();
   await createBid.logout();

   // await loginPage.goto();
   // await loginPage.loginToApplication(credentials.email_vendor, credentials.password);
   // await vendorSubmission.somemethod();

})

test('Test 02 Submitting Bid', async ({ loginPage,createBid, vendorSubmission }) => {
   await loginPage.goto();
   await loginPage.loginToApplication(credentials.email_vendor, credentials.password);
    await vendorSubmission.somemethod();

});




test.afterEach(async ({ page }) => {
   page.close();
});