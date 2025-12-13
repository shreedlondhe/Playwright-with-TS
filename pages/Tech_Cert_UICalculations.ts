
import { Page, Locator } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";
import { getBidId } from "./CreateBid";
import { log } from "../utils/Logger.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import BidExcelCalculations from "./BidExcelCalculations.ts"
import TechCertCalculations from "./Tech_Cert_ExcelCalculations.ts";



export default class TechCert_UICalculations {

    GrossRemarketingValue: Locator;
    LogisticsFees: Locator;
    ProcessingFee: Locator;
    AssetQTY: Locator;
    LenovoProcessingCharge: Locator;
    ProcessingUplift: Locator;
    Diff1: Locator;
    Diff2: Locator;
    PMOAllocation: Locator
    LenovoTotalRev: Locator;
    LenovoTotalCost: Locator;
    LenovoGP: Locator;

    grossRemarketingValue: number = 0;
    logisticsFees: number = 0;
    processingFee: number = 0;
    assetQTY: number = 0;
    lenovoProcessingCharge: number = 0;
    processingUplift: number = 0;
    diff1: number = 0;
    diff2: number = 0;
    pmoAllocation: number = 0;
    lenovoTotalRev: number = 0; 
    lenovoTotalCost: number = 0;
    lenovoGP: number = 0;
    

constructor(private page: Page) {
    this.GrossRemarketingValue = page.locator("//span[text()='Gross Remarketing Value:']/../../following-sibling::div//span");
    this.LogisticsFees = page.locator("//span[text()='Logistics Fee:']/../../following-sibling::div//span");
    this.ProcessingFee = page.locator("(//span[text()='Processing Fee:']/../../following-sibling::div//span)[1]");
    this.AssetQTY = page.locator("//span[text()='Asset QTY:']/../../following-sibling::div//span");
    this.LenovoProcessingCharge = page.locator("//span[text()='Lenovo Processing Charge:']/../../following-sibling::div//span");
    this.ProcessingUplift = page.locator("//span[text()='Processing Uplift:']/../../following-sibling::div//span");
    this.Diff1 = page.locator("(//td[text()='Diff']//following-sibling::td)[1]");
    this.Diff2 = page.locator("(//td[text()='Diff']//following-sibling::td)[2]");
    this.PMOAllocation = page.locator("(//td[text()=' PMO Allocation ']//following-sibling::td)[1]");
    this.LenovoTotalRev = page.locator("//td[text()=' Lenovo Total Rev ']//following-sibling::td");
    this.LenovoTotalCost = page.locator("//td[text()=' Lenovo Total Cost ']//following-sibling::td");
    this.LenovoGP = page.locator("//td[text()=' Lenovo GP ']//following-sibling::td");

}
async getUIValues(): Promise<void> {
                this.grossRemarketingValue = await this.convertCurrencyToNumber(await TestUtils.getText(this.GrossRemarketingValue, 'Extracting Gross Remarketing Value from Tech Cert section'));
                this.logisticsFees = await this.convertCurrencyToNumber(await TestUtils.getText(this.LogisticsFees, 'Extracting Logistics Fees from Tech Cert section'));
                this.processingFee = await this.convertCurrencyToNumber(await TestUtils.getText(this.ProcessingFee, 'Extracting Processing Fee from Tech Cert section'));
                this.assetQTY = await this.convertCurrencyToNumber(await TestUtils.getText(this.AssetQTY, 'Extracting Asset QTY from Tech Cert section'));
                this.lenovoProcessingCharge = await this.convertCurrencyToNumber(await TestUtils.getText(this.LenovoProcessingCharge, 'Extracting Lenovo Processing Charge from Tech Cert section'));
                this.processingUplift = await this.convertCurrencyToNumber(await TestUtils.getText(this.ProcessingUplift, 'Extracting Processing Uplift from Tech Cert section'));
                this.diff1 = await this.convertCurrencyToNumber(await TestUtils.getText(this.Diff1, 'Extracting Diff1 from Tech Cert section'));
                this.diff2 = await this.convertCurrencyToNumber(await TestUtils.getText(this.Diff2, 'Extracting Diff2 from Tech Cert section'));
                this.pmoAllocation = await this.convertCurrencyToNumber(await TestUtils.getText(this.PMOAllocation, 'Extracting PMO Allocation from Tech Cert section'));
                this.lenovoTotalRev = await this.convertCurrencyToNumber(await TestUtils.getText(this.LenovoTotalRev, 'Extracting Lenovo Total Rev from Tech Cert section'));
                this.lenovoTotalCost = await this.convertCurrencyToNumber(await TestUtils.getText(this.LenovoTotalCost, 'Extracting Lenovo Total Cost from Tech Cert section'));
                this.lenovoGP = await this.convertCurrencyToNumber(await TestUtils.getText(this.LenovoGP, 'Extracting Lenovo GP from Tech Cert section'));

                log(`Gross Remarketing Value: ${this.grossRemarketingValue}`);
                log(`Logistics Fees: ${this.logisticsFees}`);
                log(`Processing Fee: ${this.processingFee}`);
                log(`Asset QTY: ${this.assetQTY}`);
                log(`Lenovo Processing Charge: ${this.lenovoProcessingCharge}`);
                log(`Processing Uplift: ${this.processingUplift}`);
                log(`Diff1: ${this.diff1}`);
                log(`Diff2: ${this.diff2}`);
                log(`PMO Allocation: ${this.pmoAllocation}`);
                log(`Lenovo Total Rev: ${this.lenovoTotalRev}`);
                log(`Lenovo Total Cost: ${this.lenovoTotalCost}`);
                log(`Lenovo GP: ${this.lenovoGP}`);

}


 async convertCurrencyToNumber(value: string): Promise<number> {
            if (!value) return 0;
            const cleaned = value
                  .replace(/[^0-9.-]/g, "")
                  .trim();

            return Number(cleaned) || 0;
      }

}