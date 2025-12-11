import { test, expect } from "../fixtures/Custom-fixtures.ts"; 
import { allure } from "allure-playwright";
import * as fs from "fs";
import * as dotenv from "dotenv";
import TestUtils from "../utils/TestUtils.ts";
import BidExcelCalculations from "../pages/BidExcelCalculations.ts";
import TechCertCalculations from "../pages/Tech_Cert_ExcelCalculations.ts";
dotenv.config();



test('Test 01 TechCert calculations', async ({ loginPage, createBid, vendorSubmission ,bidStatus,techCert_UICalculations,bidExcelCalculations,techCertCalculations}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   //await ssdBidsSection_page.getData();
   await bidExcelCalculations.allExcelCalculation();
   await techCertCalculations.finalTechCertCalculations(bidExcelCalculations.remarketingvalue, bidExcelCalculations.totalAssetCount, bidExcelCalculations.totalEstimateLogisticsFees, bidExcelCalculations.EstimateProcessingFee);
   await bidStatus.openTechCertSection();
   await techCert_UICalculations.getUIValues();
   await TestUtils.compareNumbers(techCert_UICalculations.grossRemarketingValue,techCert_UICalculations.grossRemarketingValue);
   await TestUtils.compareNumbers(techCert_UICalculations.logisticsFees,techCert_UICalculations.logisticsFees);
   await TestUtils.compareNumbers(techCert_UICalculations.processingFee,techCert_UICalculations.processingFee);
   await TestUtils.compareNumbers(techCert_UICalculations.assetQTY,techCert_UICalculations.assetQTY);
   await TestUtils.compareNumbers(techCert_UICalculations.lenovoProcessingCharge,techCert_UICalculations.lenovoProcessingCharge);
   await TestUtils.compareNumbers(techCert_UICalculations.processingUplift,techCert_UICalculations.processingUplift);
   await TestUtils.compareNumbers(techCert_UICalculations.diff1,techCert_UICalculations.diff1);
   await TestUtils.compareNumbers(techCert_UICalculations.diff2,techCert_UICalculations.diff2);
   await TestUtils.compareNumbers(techCert_UICalculations.pmoAllocation,techCert_UICalculations.pmoAllocation);
   await TestUtils.compareNumbers(techCert_UICalculations.lenovoTotalRev,techCert_UICalculations.lenovoTotalRev);
   await TestUtils.compareNumbers(techCert_UICalculations.lenovoTotalCost,techCert_UICalculations.lenovoTotalCost);
   await TestUtils.compareNumbers(techCert_UICalculations.lenovoGP,techCert_UICalculations.lenovoGP);


   
})

test('Test 02 Verifying SSD Bids tab calculations', async ({ techCertCalculations,loginPage, createBid, vendorSubmission ,ssdBidsSection_page,bidExcelCalculations}) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await ssdBidsSection_page.getData();
   await bidExcelCalculations.allExcelCalculation();
   await TestUtils.compareNumbers(bidExcelCalculations.totalAssetCount,ssdBidsSection_page.grandTotalData);
   await TestUtils.compareNumbers(bidExcelCalculations.remarketingvalue,ssdBidsSection_page.remarketingValueData);
   await TestUtils.compareNumbers(bidExcelCalculations.totalEstimateLogisticsFees,ssdBidsSection_page.logisticsFeesData);
   await TestUtils.compareNumbers(bidExcelCalculations.EstimateProcessingFee,ssdBidsSection_page.processingFeesData);
   await TestUtils.compareNumbers(bidExcelCalculations.netAmount,ssdBidsSection_page.netAmountData);
   await techCertCalculations.productCount();
   
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
   await page.close();
});