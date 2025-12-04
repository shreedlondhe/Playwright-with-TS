import { test, expect } from "../fixtures/custom-fixtures"; import { credentials } from "../utils/test-data";
import { allure } from "allure-playwright";
import * as fs from "fs";




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




test.afterEach(async ({ page },testInfo) => {
     try {
    const tracePath = testInfo.outputPath("trace.zip");

    if (fs.existsSync(tracePath)) {
      const buffer = fs.readFileSync(tracePath);

      await allure.attachment(
        "Playwright Trace Zip",
        buffer,
        "application/zip"
      );
    }
  } catch (err) {
    console.error("Error attaching trace:", err);
  }
   page.close();
});