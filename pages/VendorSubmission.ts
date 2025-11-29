import { Page } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import path from 'path'
import { bidId } from "./CreateBid";

export default class VendorSubmission {
  constructor(private page: Page) {
   // console.log("Bid ID in Vendor Submission page:", bidId);
  }
  //bidId: string='6457'

//bidToSelect:string = `//td[.='${bidId}']/..//dx-button[@icon='eyeopen']`;
bidToSelect:string = `//div[@class='app-bid-history-grid mt-2']//td[.='${bidId}']/..//dx-button[@icon='eyeopen']`
AssetListSection:string="//span[.='Asset List']/.."
UploadBid:string="//span[text()='Upload Bid']"
 fileToUpload = path.resolve('C:\\Users\\Admin\\Desktop\\PyxTech_Demo\\UploadForm.xlsx');
 okButton="//span[.='OK']"

  async somemethod() {
    console.log("This is a method in VendorSubmission class.", bidId);
    await TestUtils.click(this.page, this.bidToSelect, `Clicking on Bid `+ bidId);
    await TestUtils.click(this.page, this.AssetListSection, 'Clicking on Asset List section');
    await TestUtils.fileUpload(this.page, this.UploadBid, this.fileToUpload, 'Uploading file');
    await TestUtils.click(this.page, this.okButton, 'Clicking on OK button');
    await this.page.waitForTimeout(5000);

  }



}