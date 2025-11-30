//import type { Page } from "@playwright/test";
import { Locator, Page } from "playwright-core";
import { test, expect } from "../fixtures/custom-fixtures"
import {log} from "../utils/logger";
import { allure } from 'allure-playwright';


export default  class TestUtils {
 


  static async click(page:Page,locator: string, logMsg: string): Promise<void> {
    
    //await page.click(locator);

   const elementLocator: Locator = await page.locator(locator);
   await elementLocator.waitFor();
   await elementLocator.click();
   log(logMsg);
  }
  static async jsClick(page: Page, locator: string, logMsg: string): Promise<void> {
    const elementLocator = page.locator(locator);
    await elementLocator.evaluate((node: HTMLElement) => node.click());
    log(logMsg);
}

static async mouseClick(page:Page,locator: string, logMsg: string): Promise<void> {
    const elementLocator: Locator = await page.locator(locator);
    const box = await elementLocator.boundingBox(); 
     if (!box) {
        throw new Error(`Element not found or not visible for mouse click: ${locator}`);
    }
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
     await page.mouse.click(x, y);
    log(logMsg);
}

  static async fill(page:Page,locator: string, value: string, logMsg: string): Promise<void> {
    
  
    await page.locator(locator).fill(value); 
    log(logMsg);
  }
static async fileUpload(page:Page,locator: string, filePath: string, logMsg: string): Promise<void> {
log("Uploading file: "+filePath);
  const [fileChooser] = await Promise.all([
  page.waitForEvent('filechooser'),
  page.locator(locator).click()
  
]);

await fileChooser.setFiles(filePath);
log(logMsg);

}

static async getScreenshot(page:Page, logMsg: string) {
  allure.attachment('Screenshot', await page.screenshot(), 'image/png');
  log(logMsg);
}

static async getFullScreenshot(page:Page, logMsg: string) {
 allure.attachment(
  'Screenshot',
  await page.screenshot({ fullPage: true }),
  'image/png'
);
  log(logMsg);
}
}