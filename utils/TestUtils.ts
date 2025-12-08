// //import type { Page } from "@playwright/test";
// import { Locator, Page } from "playwright-core";
// import { test, expect } from "../fixtures/Custom-fixtures"
// import { log } from "./Logger";
// import { allure } from 'allure-playwright';
// import { filePaths } from "./FilePath";
// import ExcelJS from "exceljs";
// import { faker } from '@faker-js/faker';


// export default class TestUtils {

// static async click(locator: Locator, logMsg: string): Promise<void> {
//     await locator.waitFor();
//     await locator.click();
//     log(logMsg);
//   }
  
//   static async jsClick(locator: Locator, logMsg: string): Promise<void> {
//     await locator.evaluate((node: HTMLElement) => node.click());
//     log(logMsg);
//   }

//   static async mouseClick(page: Page, locator: Locator, logMsg: string): Promise<void> {
//     const elementLocator: Locator = await locator;
//     const box = await elementLocator.boundingBox();
//     if (!box) {
//       throw new Error(`Element not found or not visible for mouse click: ${locator}`);
//     }
//     const x = box.x + box.width / 2;
//     const y = box.y + box.height / 2;
//     await page.mouse.click(x, y);
//     log(logMsg);
//   }

//   static async fill(locator: Locator, value: string, logMsg: string): Promise<void> {
//   await locator.fill(value);
//     log(logMsg);
//   }

//   static async fileUpload(page: Page, locator: Locator, filePath: string, logMsg: string): Promise<void> {
//     log("Uploading file: " + filePath);
//     const [fileChooser] = await Promise.all([
//       page.waitForEvent('filechooser'),
//       locator.click()
//     ]);

//     await fileChooser.setFiles(filePath);
//     log(logMsg);

//   }

//   static async getScreenshot(page: Page, logMsg: string) {
//     allure.attachment('Screenshot', await page.screenshot(), 'image/png');
//     log(logMsg);
//   }

//   static async getFullScreenshot(page: Page, logMsg: string) {
//     allure.attachment(
//       'Screenshot',
//       await page.screenshot({ fullPage: true }),
//       'image/png'
//     );
//     log(logMsg);
//   }



// static async downLoadFile(page: Page, locator: Locator, downloadPath: string): Promise<string> {
//   const [download] = await Promise.all([
//       page.waitForEvent("download"),
//       await TestUtils.click(locator, 'Clicking on Download button')
//  ]);
//     const fileName = download.suggestedFilename();
//     const filePath = `${downloadPath}/${fileName}`;
//     await download.saveAs(filePath);
//     const filePathForEdit = filePath;
//     //console.log(`Downloaded file saved at: ${filePath}`);
//     log(`Downloaded file saved at: ${filePath}`);
//     return  filePathForEdit;
    
// }


// static async handleAPIResponse(page: Page, urlPart: string, statusCode: number, clickLocator: Locator, clickLogMsg: string,uiDoneSelector?: Locator ): Promise<any> {
//   const [apiResponse] = await Promise.all([
//     page.waitForResponse(async res => 
//       res.url().includes(urlPart) && res.status() === statusCode
//     ),
    
//     TestUtils.click(clickLocator, clickLogMsg)
//   ]);

//   return [apiResponse];
// }

// static getRandomInRange(min: number, max: number): number {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
  

//   static async excelSheetEdit(pathToFile: string,sheetName: string,cellNo:string,value: any): Promise<void> {
//    // console.log("Adding data in cell:", cellNo, " in sheet:", sheetName);
//       const workbook = new ExcelJS.Workbook();
//   //  console.log("File to upload path: ", pathToFile);
//      await workbook.xlsx.readFile(pathToFile);
//       const sheet1 = workbook.getWorksheet(sheetName);
//       if (!sheet1) {
//         throw new Error(`Worksheet '${sheetName}' not found`);
//       }
//       sheet1.getCell(cellNo).value = value;
//    await workbook.xlsx.writeFile(pathToFile);
//   // console.log("Added data ",value, " in cell:", cellNo, " in sheet:", sheetName);
//       //console.log("Excel file updated successfully.");
//     }

//     static  getFullName(): string {
//     return faker.person.fullName();
//   }
// static getAddress(): string {
//     const street = faker.location.streetAddress();
//     const city = faker.location.city();
//     const pincode = faker.location.zipCode();

//     return `${street}, ${city}, ${pincode}`;
//   }
// static getStatement(): string {
//     return faker.lorem.sentence();
//   }

// static async sleep(ms: number): Promise<void> {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// }



import { Locator, Page } from "playwright-core";
import { log } from "./Logger";
import { allure } from "allure-playwright";
import ExcelJS from "exceljs";
import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";

export default class TestUtils {

  // CLICK ------------------------------------------------------------------

  static async click(locator: Locator, logMsg: string): Promise<void> {
    await locator.waitFor({ state: "visible" });
    await locator.click();
    log(logMsg);
  }

  static async jsClick(locator: Locator, logMsg: string): Promise<void> {
    await locator.evaluate((el: HTMLElement) => el.click());
    log(logMsg);
  }

  static async mouseClick(page: Page, locator: Locator, logMsg: string): Promise<void> {
    const box = await locator.boundingBox();
    if (!box) throw new Error(`Element not visible for mouse click: ${locator}`);

    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    log(logMsg);
  }

  // FILL -------------------------------------------------------------------

  static async fill(locator: Locator, value: string, logMsg: string): Promise<void> {
    await locator.fill(value);
    log(logMsg);
  }

  // FILE UPLOAD ------------------------------------------------------------

  static async fileUpload(page: Page, locator: Locator, filePath: string, logMsg: string): Promise<void> {
    log("Uploading file: " + filePath);

    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      locator.click()
    ]);

    await fileChooser.setFiles(filePath);
    log(logMsg);
  }

  // SCREENSHOTS ------------------------------------------------------------

  static async getScreenshot(page: Page, logMsg: string) {
    allure.attachment("Screenshot", await page.screenshot(), "image/png");
    log(logMsg);
  }

  static async getFullScreenshot(page: Page, logMsg: string) {
    allure.attachment(
      "Full Screenshot",
      await page.screenshot({ fullPage: true }),
      "image/png"
    );
    log(logMsg);
  }

  // DOWNLOAD ---------------------------------------------------------------

  static async downLoadFile(page: Page, locator: Locator, downloadPath: string): Promise<string> {
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      this.click(locator, "Clicking download button")
    ]);

    const fileName = download.suggestedFilename();
    const filePath = `${downloadPath}/${fileName}`;
    await download.saveAs(filePath);

    log(`Downloaded file saved at: ${filePath}`);
    return filePath;
  }

  // API RESPONSE -----------------------------------------------------------

  static async handleAPIResponse(page: Page, urlPart: string, statusCode: number, clickLocator: Locator, clickLogMsg: string,uiDoneSelector?: Locator ): Promise<any> {
  const [apiResponse] = await Promise.all([
    page.waitForResponse(async res => 
      res.url().includes(urlPart) && res.status() === statusCode
    ),
    
    TestUtils.click(clickLocator, clickLogMsg)
  ]);

  return [apiResponse];
}
  // RANDOM -----------------------------------------------------------------

  static getRandomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // EXCEL ------------------------------------------------------------------

  static async excelSheetEdit(
    pathToFile: string,
    sheetName: string,
    cellNo: string,
    value: any
  ): Promise<void> {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(pathToFile);

    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) throw new Error(`Sheet '${sheetName}' not found`);

    sheet.getCell(cellNo).value = value;
    await workbook.xlsx.writeFile(pathToFile);

    log(`Excel updated → Sheet: ${sheetName}, Cell: ${cellNo}, Value: ${value}`);
  }

  // FAKER ------------------------------------------------------------------

  static getFullName(): string {
    return faker.person.fullName();
  }

  static getAddress(): string {
    return `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}`;
  }

  static getStatement(): string {
    return faker.lorem.sentence();
  }

  // SLEEP ------------------------------------------------------------------

  static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  static async expectToContainText(locator: Locator, expected: string, logMsg: string): Promise<void> {
  await locator.waitFor({ state: "visible" });
  const actual = await locator.innerText();
  expect(actual?.trim()).toContain(expected);
  log(logMsg);
}

static async expectValue(locator: Locator, expected: string, logMsg: string): Promise<void> {
  await locator.waitFor({ state: "visible" });
  const actual = await locator.inputValue();
  expect(actual).toBe(expected);
  log(logMsg);
}

static async expectAttribute(locator: Locator, attribute: string, expected: string, logMsg: string): Promise<void> {
  await locator.waitFor({ state: "visible" });
  const actual = await locator.getAttribute(attribute);
  expect(actual).toBe(expected);
  log(logMsg);
}

static async expectVisible(locator: Locator, logMsg: string): Promise<void> {
  await locator.waitFor({ state: "visible" });
  await expect(locator).toBeVisible();
  log(logMsg);
}

static async getText(locator: Locator, logMsg: string): Promise<string> {
  await locator.waitFor({ state: "visible" });
  const text = (await locator.innerText())?.trim();
  log(logMsg);
  return text;
}

static async compareNumbers(num1: number, num2: number) {
    expect(num1).toBe(num2);
  }

}
