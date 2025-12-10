import { expect, Page, Locator } from "@playwright/test";
import path from 'path'
import TestUtils from "../utils/TestUtils.ts";
import { allure } from 'allure-playwright';
import { filePaths } from "../utils/FilePath.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import { log } from "../utils/Logger.ts";
import { getBidId } from "./CreateBid.ts";

export default class SsdBidsSection_page {
      bidsSection: Locator;
      grandTotal: Locator;
      remarketingValue: Locator
      logisticsFees: Locator
      processingFees: Locator
      netAmount: Locator

      grandTotalData: number = 0;
      remarketingValueData: number = 0;
      logisticsFeesData: number = 0;
      processingFeesData: number = 0
      netAmountData: number = 0

      constructor(private page: Page) {
            this.bidsSection = page.getByText('BidsBids')
            this.grandTotal = page.locator("//div[contains(@class,'dx-datagrid-summary-item')][contains(@aria-label,'Asset Count')]")
            this.remarketingValue = page.locator("(//tbody[@role='presentation'])[5]/tr[1]/td[3]/div");
            this.logisticsFees = page.locator("(//tbody[@role='presentation'])[5]/tr[1]/td[4]/div");
            this.processingFees = page.locator("(//tbody[@role='presentation'])[5]/tr[1]/td[5]/div");
            this.netAmount = page.locator("(//tbody[@role='presentation'])[5]/tr[1]/td[6]/div");

      }
      async getData() {
            await this.selectBid()
            this.grandTotalData = parseInt(await TestUtils.getText(this.grandTotal, 'Extracting Grand Value from SSD Bids section'));

            await TestUtils.click(this.bidsSection, "Clicking on Bids section")
            this.remarketingValueData = await this.convertCurrencyToNumber(await TestUtils.getText(this.remarketingValue, 'Extracting Remarketing Value from SSD Bids section'));
            this.logisticsFeesData = await this.convertCurrencyToNumber(await TestUtils.getText(this.logisticsFees, 'Extracting Lgistic fees Value from SSD Bids section'));
            this.processingFeesData = await this.convertCurrencyToNumber(await TestUtils.getText(this.processingFees, 'Extracting Processing fees Value from SSD Bids section'));
            this.netAmountData = await this.convertCurrencyToNumber(await TestUtils.getText(this.netAmount, 'Extracting Net amount Value from SSD Bids section'));

            //     console.log(this.grandTotalData)
            //     console.log( this.remarketingValueData)
            //     console.log( this.logisticsFeesData)
            //     console.log( this.processingFeesData)
            //     console.log( this.netAmountData)

      }


      bidId: string = "";
      async selectBid() {
            this.bidId = getBidId();
            const bidToSelect = this.page.locator(`//td[text()='${this.bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);
            log(`Bid Id : ${this.bidId}`);
            await TestUtils.click(bidToSelect, "Selecting Bid")
      }


      async convertCurrencyToNumber(value: string): Promise<number> {
            if (!value) return 0;
            const cleaned = value
                  .replace(/[^0-9.-]/g, "")
                  .trim();

            return Number(cleaned) || 0;
      }









}