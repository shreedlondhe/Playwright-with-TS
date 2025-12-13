import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import CreateBid from '../pages/CreateBid';
import BidStatus from '../pages/SSDBidStatus.ts';
import VendorSubmission from '../pages/VendorSubmission';
//import VendorBidStatus from 'C:/Users/Admin/Downloads/PyxTech/pages/VendorBidStatus.ts';
import VendorBidStatus from '../pages/VendorBidStatus.ts';
import SsdBidsSection_page from '../pages/SsdBidsSection_page.ts';
import BidExcelCalculations from '../pages/BidExcelCalculations.ts'

import { log } from '../utils/Logger';
import TechCert_UICalculations from '../pages/Tech_Cert_UICalculations.ts';
import TechCertCalculations from '../pages/Tech_Cert_ExcelCalculations.ts';
import SsdSummeryTab from '../pages/SsdSummeryTab.ts';


export const test = base.extend<{ loginPage: LoginPage, createBid: CreateBid , vendorSubmission: VendorSubmission,bidStatus:BidStatus,vendorBidStatus:VendorBidStatus,ssdBidsSection_page:SsdBidsSection_page,bidExcelCalculations:BidExcelCalculations,
  techCert_UICalculations:TechCert_UICalculations,techCertCalculations:TechCertCalculations,ssdSummeryTab:SsdSummeryTab}>({
  loginPage: async ({ page }, use) => {
   
    await use(new LoginPage(page));
   },
  createBid: async ({ page }, use) => {
    await use(new CreateBid(page));

  },
  vendorSubmission: async ({ page }, use) => {
    await use(new VendorSubmission(page));

  },
   bidStatus: async ({ page }, use) => {
    await use(new BidStatus(page));

  },
  vendorBidStatus: async ({ page }, use) => {
    await use(new VendorBidStatus(page));

  },
  ssdBidsSection_page: async ({ page }, use) => {
    await use(new SsdBidsSection_page(page));

  },
  bidExcelCalculations: async ({ page }, use) => {
    await use(new BidExcelCalculations(page));

  },
  techCert_UICalculations: async ({ page }, use) => {
    await use(new TechCert_UICalculations(page));

  },
   techCertCalculations: async ({ page }, use) => {
    await use(new TechCertCalculations(page));

  },
  ssdSummeryTab: async ({ page }, use) => {
    await use(new SsdSummeryTab(page));

  },
   
   
});



export const expect = test.expect;