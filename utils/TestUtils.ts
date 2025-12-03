//import type { Page } from "@playwright/test";
import { Locator, Page } from "playwright-core";
import { test, expect } from "../fixtures/custom-fixtures"
import { log } from "../utils/logger";
import { allure } from 'allure-playwright';


export default class TestUtils {



  static async click(locator: Locator, logMsg: string): Promise<void> {
    await locator.waitFor();
    await locator.click();
    log(logMsg);
  }
  
  static async jsClick(locator: Locator, logMsg: string): Promise<void> {
    await locator.evaluate((node: HTMLElement) => node.click());
    log(logMsg);
  }

  static async mouseClick(page: Page, locator: Locator, logMsg: string): Promise<void> {
    const elementLocator: Locator = await locator;
    const box = await elementLocator.boundingBox();
    if (!box) {
      throw new Error(`Element not found or not visible for mouse click: ${locator}`);
    }
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.click(x, y);
    log(logMsg);
  }

  static async fill(locator: Locator, value: string, logMsg: string): Promise<void> {
  await locator.fill(value);
    log(logMsg);
  }

  static async fileUpload(page: Page, locator: Locator, filePath: string, logMsg: string): Promise<void> {
    log("Uploading file: " + filePath);
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      locator.click()
    ]);

    await fileChooser.setFiles(filePath);
    log(logMsg);

  }

  static async getScreenshot(page: Page, logMsg: string) {
    allure.attachment('Screenshot', await page.screenshot(), 'image/png');
    log(logMsg);
  }

  static async getFullScreenshot(page: Page, logMsg: string) {
    allure.attachment(
      'Screenshot',
      await page.screenshot({ fullPage: true }),
      'image/png'
    );
    log(logMsg);
  }



static async downLoadFile(page: Page, locator: Locator, downloadPath: string): Promise<string> {
  const [download] = await Promise.all([
      page.waitForEvent("download"),
      await TestUtils.click(locator, 'Clicking on Download Bid button')
 ]);
    const fileName = download.suggestedFilename();
    const filePath = `${downloadPath}/${fileName}`;
    await download.saveAs(filePath);
    const filePathForEdit = filePath;
    console.log(`Downloaded file saved at: ${filePath}`);
    return  filePathForEdit;
    
}


static async handleAPIResponse(page: Page, urlPart: string, statusCode: number, clickLocator: Locator, clickLogMsg: string): Promise<any> {
  const [apiResponse] = await Promise.all([
    page.waitForResponse(async res => 
      res.url().includes(urlPart) && res.status() === statusCode
    ),
    TestUtils.click(clickLocator, clickLogMsg)
  ]);

  return [apiResponse];
}
}