import { Page } from "@playwright/test";
import path from 'path'
import TestUtils from "../utils/TestUtils";
import { allure } from 'allure-playwright';

export let bidId: string | undefined;

export default class CreateBid {
  constructor(private page: Page) {}
createBidButton: string = "//div[@class='dx-item-content dx-accordion-item-title']";
 fileToUpload = path.resolve('C:\\Users\\Admin\\Desktop\\PyxTech_Demo\\Input-template.xlsx');
chooseFile="//input[@type='file' and contains(@accept,'.xlsx, .xls')]"
vendorDropdown="//input[@placeholder='Vendor']"
selectAllVendors="//div[@class='dx-list-select-all-label']"
selectBusinessUnit="//input[@placeholder='Select Business Unit']"
selectIDG="//div[.='IDG']/div"
 submit="//span[.='Submit Bid Request']"

    async createBid() {
        await TestUtils.click(this.page, this.createBidButton, 'Clicking on Create Bid button');
        await this.page.locator(this.chooseFile).setInputFiles(this.fileToUpload);
        await TestUtils.click(this.page, this.vendorDropdown, 'Clicking on Vendor dropdown');
        await TestUtils.click(this.page, this.selectAllVendors, 'Clicking on Select All Vendors');
       await TestUtils.click(this.page, this.selectBusinessUnit, 'Clicking on Select Business Unit');
        await TestUtils.click(this.page, this.selectIDG, 'Clicking on Select IDG');

         const [apiResponse] = await Promise.all([
    this.page.waitForResponse(res =>
        res.url().includes('/apis/bid-request/submit')
    ),
   // this.page.click(this.submit )   
    TestUtils.click(this.page, this.submit, 'Clicking on Submit Bid Request')
]);
// const screenshot = await this.page.screenshot();
// allure.attachment('Screenshot', screenshot, 'image/png');
//allure.attachment('Screenshot', await this.page.screenshot(), 'image/png');
await TestUtils.getScreenshot(this.page, 'Taking screenshot after submitting bid request');

const json = await apiResponse.json();
bidId = '6'+json.result.bidId;
const message = json.result.message;
console.log("Bid ID:", bidId);
console.log("Message:", message);
await this.page.close();
}
}
