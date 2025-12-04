import { Page, Locator } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import path from 'path'
import { bidId } from "./CreateBid";
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";

export default class VendorSubmission {
  AssetListSection: Locator;
  UploadBid: Locator
  downloadBid: Locator
  okButton: Locator
  submitBidButton: Locator
  bidToSelect: Locator;


  BidID = bidId;

  constructor(private page: Page) {
    this.AssetListSection = page.getByText('Asset ListAsset List');
    this.UploadBid = page.getByRole('button', { name: 'Upload Bid' });
    this.downloadBid = page.getByRole("button", { name: "Download Bid" });
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.submitBidButton = page.getByRole('button', { name: 'Submit Bid' });
    this.bidToSelect = page.locator(`//div[@class='app-bid-history-grid mt-2']//td[.='${bidId}']/..//dx-button[@icon='eyeopen']`);
  }

  async somemethod() {
    console.log("This is a method in VendorSubmission class.", bidId);
    await TestUtils.click(this.bidToSelect, `Clicking on Bid ` + bidId);
    await TestUtils.click(this.AssetListSection, 'Clicking on Asset List section');
    filePaths.filePathForEdit = await TestUtils.downLoadFile(this.page, this.downloadBid, filePaths.downloadPath);
    await this.updateCell();


    // await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Overview","D19",500);
    // await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","P3",65);
    // await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","P4",65);
    // await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","Q3",566);
    // await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","Q4",6565);



    const uploadDownloadedBid = path.resolve(filePaths.filePathForEdit);
    await TestUtils.fileUpload(this.page, this.UploadBid, uploadDownloadedBid, 'Uploading file');
    await TestUtils.click(this.okButton, 'Clicking on OK button');
    const [apiResponse] = await TestUtils.handleAPIResponse(this.page, '/apis/bid', 201, this.submitBidButton, 'Clicking on Submit Bid');
    // Parse JSON response
    const responseBody = await apiResponse.json();
    //console.log("API Response:", responseBody);
    const message = responseBody.message;
    console.log("Extracted Message After clicking On submit is : ", message);
  }
  async updateCell() {
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Overview","D19",500);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","P3",65);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","P4",65);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","Q3",566);
    await TestUtils.excelSheetEdit(filePaths.filePathForEdit,"Product Details","Q4",6565);
    // const workbook = new ExcelJS.Workbook();
    // console.log("File to upload path:", filePaths.filePathForEdit);
    // await workbook.xlsx.readFile(filePaths.filePathForEdit);
    // const sheet1 = workbook.getWorksheet("Overview");
    // if (!sheet1) {
    //   throw new Error("Worksheet 'Overview' not found");
    // }
    // sheet1.getCell("D19").value = 500;

    // const sheet2 = workbook.getWorksheet("Product Details");

    // if (!sheet2) {
    //   throw new Error("Worksheet 'Product Details' not found");
    // }
    // sheet2.getCell("P3").value = 65;
    // sheet2.getCell("P4").value = 65;
    // sheet2.getCell("Q3").value = 566;
    // sheet2.getCell("Q4").value = 6565;
    // await workbook.xlsx.writeFile(filePaths.filePathForEdit);
    // console.log("Excel file updated successfully.");
  }
  
}