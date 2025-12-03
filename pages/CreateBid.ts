import { expect, Page, Locator } from "@playwright/test";
import path from 'path'
import TestUtils from "../utils/TestUtils";
import { allure } from 'allure-playwright';
import { filePaths } from "../utils/FilePath.ts";

export let bidId: string | undefined;

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
  chooseFilePath:string

  constructor(private page: Page) {

    this.createBidButton = page.getByText("Create New Bid Request");
    this.chooseFilePath ="//input[@type='file' and contains(@accept,'.xlsx, .xls')]";
    this.vendorDropdown = page.locator('.dx-texteditor-input-container.dx-tag-container').first()
    this.selectAllVendors = page.getByText("Select All");
    this.selectBusinessUnit = page.getByPlaceholder("Select Business Unit");
    this.selectIDG = page.getByText("IDG");
    this.submit = page.getByText("Submit Bid Request");
    this.SSDLogo = page.getByText("(SSD)");
    this.logoutButton = page.getByText("Logout");
    this.okButton = page.getByText("OK");
  }

  // fileToUpload = path.resolve('C:\\Users\\Admin\\Desktop\\PyxTech_Demo\\Input-template.xlsx');
  // chooseFile = "//input[@type='file' and contains(@accept,'.xlsx, .xls')]"

  async createBid() {
    await TestUtils.click(this.createBidButton, 'Clicking on Create Bid button');
    await this.page.locator(this.chooseFilePath).setInputFiles(filePaths.inventoryIntake);
    await TestUtils.click(this.vendorDropdown, 'Clicking on Vendor dropdown');
    await TestUtils.click(this.selectAllVendors, 'Clicking on Select All Vendors');
    await TestUtils.click(this.selectBusinessUnit, 'Clicking on Select Business Unit');
    await TestUtils.click(this.selectIDG, 'Clicking on Select IDG');
    const [apiResponse] = await TestUtils.handleAPIResponse(this.page, '/apis/bid-request/submit', 201, this.submit, 'Clicking on Submit Bid Request');
    await TestUtils.getScreenshot(this.page, 'Taking screenshot after submitting bid request');
    const json = await apiResponse.json();
    bidId = '6' + json.result.bidId;
    console.log("Bid ID:", bidId);
    console.log("Message:", json.result.message);
    expect(json.result.message).toBe('bid request created successfully.');
    await TestUtils.click(this.okButton, 'Clicking on OK button');
  }
  async logout() {
    await TestUtils.click(this.SSDLogo, 'Clicking on SSD Logo to open user menu');
    await TestUtils.click(this.logoutButton, 'Clicking on Logout button');
    await TestUtils.getScreenshot(this.page, 'Taking screenshot after logout');
    await this.page.close
  }
}