import { test, expect } from "../fixtures/Custom-fixtures.ts";
import { allure } from "allure-playwright";
import * as fs from "fs";
import * as dotenv from "dotenv";
import TestUtils from "../utils/TestUtils.ts";
import BidExcelCalculations from "../pages/BidExcelCalculations.ts";
import TechCertCalculations from "../pages/Tech_Cert_ExcelCalculations.ts";
import { log } from "../utils/Logger.ts";
dotenv.config();



test('Test 01 TechCert calculations', async ({ loginPage, createBid, vendorSubmission, bidStatus, techCert_UICalculations, bidExcelCalculations, techCertCalculations }) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await bidExcelCalculations.allExcelCalculation();
   await techCertCalculations.finalTechCertCalculations(bidExcelCalculations.remarketingvalue, bidExcelCalculations.totalAssetCount, bidExcelCalculations.totalEstimateLogisticsFees, bidExcelCalculations.EstimateProcessingFee);
   await bidStatus.openTechCertSection();
   await techCert_UICalculations.getUIValues();
   log('Comparing Tech Cert UI Calculations with Excel Calculations');
   await TestUtils.compareNumbers(techCertCalculations.grossRemarketingValue, techCert_UICalculations.grossRemarketingValue);
   await TestUtils.compareNumbers(techCertCalculations.logisticsFees, techCert_UICalculations.logisticsFees);
   await TestUtils.compareNumbers(techCertCalculations.processingFee, techCert_UICalculations.processingFee);
   await TestUtils.compareNumbers(techCertCalculations.assetQTY, techCert_UICalculations.assetQTY);
   await TestUtils.compareNumbers(techCertCalculations.lenovoProcessingCharge, techCert_UICalculations.lenovoProcessingCharge);
   await TestUtils.compareNumbers(techCertCalculations.processingUplift, techCert_UICalculations.processingUplift);
   await TestUtils.compareNumbers(techCertCalculations.Diff1, techCert_UICalculations.diff1);
   await TestUtils.compareNumbers(techCertCalculations.Diff2, techCert_UICalculations.diff2);
   await TestUtils.compareNumbers(techCertCalculations.PMOAllocation, techCert_UICalculations.pmoAllocation);
   await TestUtils.compareNumbers(techCertCalculations.LenovoTotalRev, techCert_UICalculations.lenovoTotalRev);
   await TestUtils.compareNumbers(techCertCalculations.LenovoTotalCost, techCert_UICalculations.lenovoTotalCost);
   await TestUtils.compareNumbers(techCertCalculations.LenovoGP, techCert_UICalculations.lenovoGP);
   log('Comparison of Tech Cert UI Calculations with Excel Calculations completed successfully');



})

test('Test 02 Verifying SSD Bids tab calculations', async ({ techCertCalculations, loginPage, createBid, vendorSubmission, ssdBidsSection_page, bidExcelCalculations }) => {
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
   await TestUtils.compareNumbers(bidExcelCalculations.totalAssetCount, ssdBidsSection_page.grandTotalData);
   await TestUtils.compareNumbers(bidExcelCalculations.remarketingvalue, ssdBidsSection_page.remarketingValueData);
   await TestUtils.compareNumbers(bidExcelCalculations.totalEstimateLogisticsFees, ssdBidsSection_page.logisticsFeesData);
   await TestUtils.compareNumbers(bidExcelCalculations.EstimateProcessingFee, ssdBidsSection_page.processingFeesData);
   await TestUtils.compareNumbers(bidExcelCalculations.netAmount, ssdBidsSection_page.netAmountData);
   await techCertCalculations.productCount();

})

test('Test 03 Vendor submission  flow', async ({ loginPage, createBid, vendorSubmission, bidStatus }) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();

})
test('Test 04 Bid confirmation  flow', async ({ loginPage, createBid, vendorSubmission, bidStatus }) => {
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

test('Test 05 Bid won flow', async ({ loginPage, createBid, vendorSubmission, bidStatus }) => {
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

test('Test 06 Bid Lost flow', async ({ loginPage, createBid, vendorSubmission, bidStatus }) => {
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
test('Test 07 Bid cancel Flow', async ({ loginPage, createBid, vendorSubmission, bidStatus }) => {
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
test('Test 08 Bid decline Flow', async ({ loginPage, createBid, vendorBidStatus }) => {
   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorBidStatus.declineBid();

})

test('Test 09 Bid Summary Tab values check', async ({ loginPage, createBid, vendorSubmission, ssdSummeryTab }) => {

   await loginPage.goto();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await createBid.createBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_vendor!, process.env.password!);
   await vendorSubmission.submitBid();
   await createBid.logout();
   await loginPage.loginToApplication(process.env.email_ssd!, process.env.password!);
   await ssdSummeryTab.getSummeryTabData();
})









test.beforeEach(async ({ }, testInfo) => {
   console.log(`>>>>>>>>>>>>>> STARTING TEST: ${testInfo.title} <<<<<<<<<<<<<<<`);
});

test.afterEach(async ({ page }, testInfo) => {

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