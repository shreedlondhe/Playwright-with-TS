import { test, expect } from "../fixtures/Custom-fixtures.ts"; 
import { allure } from "allure-playwright";
import * as fs from "fs";
import * as dotenv from "dotenv";
import TestUtils from "../utils/TestUtils.ts";
import BidExcelCalculations from "../pages/BidExcelCalculations.ts";
import TechCertCalculations from "../pages/Tech_CertCalculations.ts";
dotenv.config();



test('Test 01 TechCert calculations', async ({ loginPage, createBid, vendorSubmission ,ssdBidsSection_page}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await ssdBidsSection_page.getData();
   await BidExcelCalculations.allExcelCalculation();
   await TechCertCalculations.finalTechCertCalculations();
   
})

test('Test 02 Verifying SSD Bids tab calculations', async ({ loginPage, createBid, vendorSubmission ,ssdBidsSection_page}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await ssdBidsSection_page.getData();
   await BidExcelCalculations.allExcelCalculation();
   await TestUtils.compareNumbers(BidExcelCalculations.totalAssetCount,ssdBidsSection_page.grandTotalData);
   await TestUtils.compareNumbers(BidExcelCalculations.remarketingvalue,ssdBidsSection_page.remarketingValueData);
   await TestUtils.compareNumbers(BidExcelCalculations.totalEstimateLogisticsFees,ssdBidsSection_page.logisticsFeesData);
   await TestUtils.compareNumbers(BidExcelCalculations.EstimateProcessingFee,ssdBidsSection_page.processingFeesData);
   await TestUtils.compareNumbers(BidExcelCalculations.netAmount,ssdBidsSection_page.netAmountData);
   await TechCertCalculations.productCount();
   
})

test('Test 03 Vendor submission  flow', async ({ loginPage, createBid, vendorSubmission ,bidStatus}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
  
})
test('Test 04 Bid confirmation  flow', async ({ loginPage, createBid, vendorSubmission ,bidStatus}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await bidStatus.confirmBid();
  
})

test('Test 05 Bid won flow', async ({ loginPage, createBid, vendorSubmission ,bidStatus}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await bidStatus.confirmBid();
   await bidStatus.wonBid()
})

test('Test 06 Bid Lost flow', async ({ loginPage, createBid, vendorSubmission ,bidStatus}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await bidStatus.confirmBid();
   await bidStatus.lostBid()
})
test('Test 07 Bid cancel Flow', async ({ loginPage, createBid, vendorSubmission ,bidStatus}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();  
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await bidStatus.confirmBid();
   await bidStatus.CancelBid();
})
test('Test 08 Bid decline Flow', async ({ loginPage, createBid,vendorBidStatus}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout(); 
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorBidStatus.declineBid();
 
})







test.beforeEach(async ({}, testInfo) => {
  console.log(`>>>>>>>>>>>>>> STARTING TEST: ${testInfo.title} <<<<<<<<<<<<<<<`);
});

test.afterEach(async ({ page },testInfo) => {

   console.log(`>>>>>>>>>>>>>> ENDING TEST: ${testInfo.title} <<<<<<<<<<<<<<<`);
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