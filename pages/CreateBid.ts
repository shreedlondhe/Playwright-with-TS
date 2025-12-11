import { expect, Page, Locator } from "@playwright/test";
import path from 'path'
import TestUtils from "../utils/TestUtils";
import { allure } from 'allure-playwright';
import { filePaths } from "../utils/FilePath.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import { log } from "../utils/Logger.ts";

let bidId: string = "";
export function getBidId() {
  return bidId;
}
export default class CreateBid {
  createBidButton: Locator;
  vendorDropdown: Locator;
  selectAllVendors: Locator;
  selectBusinessUnit: Locator;
  selectIDG: Locator
  submit: Locator;
  SSDLogo: Locator
  logoutButton: Locator;
  okButton: Locator;
  chooseFilePath: string;
  downloadBtn: Locator
  visibleFile: Locator
  constructor(private page: Page) {
    this.createBidButton = page.getByText("Create New Bid Request");
    this.downloadBtn = page.getByRole('button', { name: 'Download Template' });
    this.chooseFilePath = "//input[@type='file' and contains(@accept,'.xlsx, .xls')]";
  // this.chooseFilePath = page.getByRole('button', { name: 'Choose File' }).first()
    this.vendorDropdown = page.locator('.dx-texteditor-input-container.dx-tag-container').first()
    this.selectAllVendors = page.getByText("Select All");
    this.selectBusinessUnit = page.getByRole('combobox', { name: 'Select Business Unit' });
    this.selectIDG = page.getByText('IDG', { exact: true });
    this.submit = page.getByText("Submit Bid Request");
    this.SSDLogo = page.locator('.dx-button-icon');
    this.logoutButton = page.getByText("Logout");
    this.okButton = page.getByRole('button', { name: 'OK' })
    this.visibleFile = page.locator('i').nth(5)
}
    async createBid(){
     
    await TestUtils.click(this.createBidButton, 'Clicking on Create Bid button');
      filePaths.filePathForEdit = await TestUtils.downLoadFile(this.page, this.downloadBtn, filePaths.downloadPathIntakeForm);
   dynamicData.dataFiller(filePaths.filePathForEdit); 
    await TestUtils.sleep(3000)

   await this.page.locator(this.chooseFilePath).setInputFiles(filePaths.filePathForEdit);
   await TestUtils.sleep(1000)

    await TestUtils.click(this.vendorDropdown, 'Clicking on Vendor dropdown');
    await TestUtils.click(this.selectAllVendors, 'Clicking on Select All Vendors');
    await TestUtils.click(this.selectBusinessUnit, 'Clicking on Select Business Unit');
    await TestUtils.click(this.selectIDG, 'Clicking on Select IDG');
    const [apiResponse] = await TestUtils.handleAPIResponse(this.page, '/apis/bid-request/submit', 201, this.submit, 'Clicking on Submit Bid Request');
    await TestUtils.getScreenshot(this.page, 'Taking screenshot after submitting bid request');
    const json = await apiResponse.json();
    bidId = 6000 + json.result.bidId;
    log(`Bid ID: ${bidId}`);
    expect(json.result.message).toBe('bid request created successfully.');
    await TestUtils.click(this.okButton, 'Clicking on OK button');
  }
  async logout() {
    await TestUtils.click(this.SSDLogo, 'Clicking on SSD Logo to open user menu');
    await TestUtils.click(this.logoutButton, 'Clicking on Logout button');
    await TestUtils.getScreenshot(this.page, 'Taking screenshot after logout');
  }


}