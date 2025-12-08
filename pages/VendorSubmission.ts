import { Page, Locator } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";
import { getBidId } from "./CreateBid";
import { log } from "../utils/Logger.ts";

export default class VendorSubmission {
  AssetListSection: Locator;
  UploadBid: Locator
  downloadBid: Locator
  okButton: Locator
  submitBidButton: Locator
constructor(private page: Page) {
    this.AssetListSection = page.getByText('Asset ListAsset List');
    this.UploadBid = page.getByRole('button', { name: 'Upload Bid' });
    this.downloadBid = page.getByRole("button", { name: "Download Bid" });
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.submitBidButton = page.getByRole('button', { name: 'Submit Bid' });
 }

async selectBid(){
 const bidId = getBidId();
    const bidToSelect = this.page.locator(`//div[@class='app-bid-history-grid mt-2']//td[.='${bidId}']/..//dx-button[@icon='eyeopen']`);
    log(`Bid Id : ${bidId}`);
    await TestUtils.click(bidToSelect, `Clicking on Bid ` + bidId);
}

async submitBid() {
   await this.selectBid();
    await TestUtils.click(this.AssetListSection, 'Clicking on Asset List section');
    filePaths.filePathForEdit = await TestUtils.downLoadFile(this.page, this.downloadBid, filePaths.downloadPath);
    await this.updateCell();
    const uploadDownloadedBid = path.resolve(filePaths.filePathForEdit);
    await TestUtils.fileUpload(this.page, this.UploadBid, uploadDownloadedBid, 'Uploading file');
    await TestUtils.click(this.okButton, 'Clicking on OK button');
    const [apiResponse] = await TestUtils.handleAPIResponse(this.page, '/apis/bid', 201, this.submitBidButton, 'Clicking on Submit Bid');
    const responseBody = await apiResponse.json();
    const message = responseBody.message;
    log(`Extracted Message After clicking On submit is : "${message}"`);
    await TestUtils.click(this.okButton, 'Clicking on OK button');
  }
  async updateCell() {
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Overview", "D19", 500);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Product Details", "P3", 65);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Product Details", "P4", 65);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Product Details", "Q3", 566);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Product Details", "Q4", 6565);

  }

}