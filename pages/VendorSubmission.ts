import { Page } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import path from 'path'
import { bidId } from "./CreateBid";
import ExcelJS from "exceljs";

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
filePathForEdit: string = '';
 okButton="//span[.='OK']"
downloadBid="//span[.='Download Bid']"
downloadPath=path.resolve('C:\\Users\\Admin\\Downloads\\VendorDownloads');
submitBidButton="//span[.='Submit Bid']"


  async somemethod() {
    console.log("This is a method in VendorSubmission class.", bidId);
    await TestUtils.click(this.page, this.bidToSelect, `Clicking on Bid `+ bidId);
    await TestUtils.click(this.page, this.AssetListSection, 'Clicking on Asset List section');

 const [download] = await Promise.all([
    this.page.waitForEvent("download"),
    await TestUtils.click(this.page, this.downloadBid, 'Clicking on Download Bid button')
    //this.page.click(this.downloadBid)   // <-- Replace with your download button locator
  ]);
const fileName = download.suggestedFilename();
 const filePath = `${this.downloadPath}/${fileName}`;
await download.saveAs(filePath);
this.filePathForEdit = filePath;
 console.log(`Downloaded file saved at: ${filePath}`);

await this.updateCell();


const uploadDownloadedBid=path.resolve(filePath);
    await TestUtils.fileUpload(this.page, this.UploadBid, uploadDownloadedBid, 'Uploading file');
    await TestUtils.click(this.page, this.okButton, 'Clicking on OK button');
    // await TestUtils.click(this.page, this.submitBidButton, 'Clicking on Submit Bid button');
    // await this.page.waitForTimeout(3000);




const [apiResponse] = await Promise.all([
    this.page.waitForResponse(async res => {
        return res.url().includes("/apis/bid") && res.status() === 201;
    }),
 TestUtils.click(this.page, this.submitBidButton, "Clicking on Submit Bid")
]);

// Parse JSON response
const responseBody = await apiResponse.json();
//console.log("API Response:", responseBody);
const message = responseBody.message;
console.log("Extracted Message After clicking On submit is : ", message);


  }
  

//   async downloadBidDocument(){

//     const [download] = await Promise.all([
//     this.page.waitForEvent("download"),
//     this.page.click(this.downloadBid)   // <-- Replace with your download button locator
//   ]);
// const fileName = download.suggestedFilename();
// const filePath = `${this.downloadPath}/${fileName}`;
// await download.saveAs(filePath);
//  console.log(`Downloaded file saved at: ${filePath}`);
//  }


async  updateCell() {
  const workbook = new ExcelJS.Workbook();
  console.log("File to upload path:", this.filePathForEdit);
  await workbook.xlsx.readFile(this.filePathForEdit);

  const sheet1 = workbook.getWorksheet("Overview");

  if (!sheet1) {
    throw new Error("Worksheet 'Overview' not found");
  }

  // Set value in D19
  sheet1.getCell("D19").value = 500;

  const sheet2 = workbook.getWorksheet("Product Details");

  if (!sheet2) {
    throw new Error("Worksheet 'Product Details' not found");
  }


   sheet2.getCell("P3").value = 500;
  sheet2.getCell("P4").value = 500;
  sheet2.getCell("Q3").value = 500;
  sheet2.getCell("Q4").value = 500;

  await workbook.xlsx.writeFile(this.filePathForEdit);

 //console.log("Successfully updated D19 = 500");
}


}