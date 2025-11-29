//import type { Page } from "@playwright/test";
import { Page } from "playwright-core";
import { test, expect } from "../fixtures/custom-fixtures"
import {log} from "../utils/logger";


export default  class TestUtils {
 


  static async click(page:Page,locator: string, logMsg: string): Promise<void> {
    
    await page.click(locator);

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
}