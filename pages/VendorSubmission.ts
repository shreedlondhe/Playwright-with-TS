import { Page, Locator } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";
import { getBidId } from "./CreateBid";
import { log } from "../utils/Logger.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";

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
   await this.fillBidData();
    const uploadDownloadedBid = path.resolve(filePaths.filePathForEdit);
    await TestUtils.fileUpload(this.page, this.UploadBid, uploadDownloadedBid, 'Uploading file');
    await TestUtils.click(this.okButton, 'Clicking on OK button');
    const [apiResponse] = await TestUtils.handleAPIResponse(this.page, '/apis/bid', 201, this.submitBidButton, 'Clicking on Submit Bid');
    const responseBody = await apiResponse.json();
    const message = responseBody.message;
    log(`Extracted Message After clicking On submit is : "${message}"`);
    await TestUtils.click(this.okButton, 'Clicking on OK button');
   
  }
  //  async readExcel() {
//   const workbook = new ExcelJS.Workbook();
//   await workbook.xlsx.readFile(filePaths.filePathForEdit);

//   const sheet = workbook.getWorksheet("Product Details"); // or index

//   if (!sheet) {
//     throw new Error("Sheet 'Product Details' not found in Excel file");
//   }

//   const valueO2 = sheet.getCell("O4").value;

//   console.log(" ********************************************************************************************************Value of cell O4:", valueO2);
// }

  
async fillBidData(){
await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Overview", "D19", TestUtils.getRandomInRange(101, 999));
  for(let i=3;i<13;i++){
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Product Details", `P${i}`, TestUtils.getRandomInRange(11, 99));
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit, "Product Details", `Q${i}`, TestUtils.getRandomInRange(1001, 9999));

  }
}

}