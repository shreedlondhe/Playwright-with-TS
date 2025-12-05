import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import CreateBid from '../pages/CreateBid';
import BidStatus from '../pages/BidStatus';
import TestUtils from '../utils/TestUtils';
import VendorSubmission from '../pages/VendorSubmission';
import { log } from '../utils/Logger';


export const test = base.extend<{ loginPage: LoginPage, createBid: CreateBid , vendorSubmission: VendorSubmission,bidStatus:BidStatus}>({
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

  }
});



export const expect = test.expect;