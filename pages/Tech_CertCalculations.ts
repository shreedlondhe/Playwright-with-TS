import TestUtils from "../utils/TestUtils.ts";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";
import { log } from "../utils/Logger.ts";
import BidExcelCalculations from "./BidExcelCalculations.ts";

export const productType: Record<string, number> = {
    "Desktop": 5.25,
    "Chromebook": 5.25,
    "Notebook/Laptop": 5.25,
    "Tablet": 5.25,
    "Mobile/Smartphone": 4,
    "All in One / Workstation / Apple MacPro (<13.6 kg)": 5.25,
    "Flat Panel Display/Monitor": 4,
    "Cathode Ray Tube (CRT) Monitor": 10.25,
    "Server (1 Drive)": 10.25,
    "Storage (1 Drive)": 0
};

export default class TechCertCalculations {

    static lenovoProcessingCharge = 0;
    static grossRemarketingValue = 0;
    static assetQTY = 0;
    static logisticsFees = 0;
    static processingFee = 0;
    static standardPMOCost = 276;
    static extraPMOCost = 23;
    static processingUplift = 0;
    static customerPRV = 0;
    static Diff1 = 0;
    static Diff2 = 0;
    static PMOAllocation = 0;
    static LenovoTotalRev = 0;
    static LenovoTotalCost = 0;
    static LenovoGP = 0;

static initializeValues() {

        this.grossRemarketingValue = BidExcelCalculations.remarketingvalue;
        this.assetQTY = BidExcelCalculations.totalAssetCount;
        this.logisticsFees = BidExcelCalculations.totalEstimateLogisticsFees;
        this.processingFee = BidExcelCalculations.EstimateProcessingFee;

        // Calculations
        this.processingUplift =
            this.roundOff(this.processingFee - this.lenovoProcessingCharge);

        this.customerPRV =
            this.roundOff(this.grossRemarketingValue - (this.grossRemarketingValue * 0.10));

        this.Diff1 =
            this.roundOff(this.grossRemarketingValue - this.customerPRV);

        this.Diff2 =
            this.roundOff(this.processingFee - this.lenovoProcessingCharge);

        this.PMOAllocation =
            this.roundOff(this.standardPMOCost + this.extraPMOCost);

        this.LenovoTotalRev =
            this.roundOff(this.lenovoProcessingCharge + this.logisticsFees + this.grossRemarketingValue);

        this.LenovoTotalCost =
            this.roundOff(this.customerPRV + this.processingFee + this.logisticsFees + this.PMOAllocation);

        this.LenovoGP =
            this.roundOff(this.LenovoTotalRev - this.LenovoTotalCost);
    }

    static async finalTechCertCalculations() {
        await this.productCount()
        this.initializeValues();
        log(`Lenovo Processing Charge: ${this.lenovoProcessingCharge}`);
        log(`Gross Remarketing Value: ${this.grossRemarketingValue}`);
        log(`Asset Quantity: ${this.assetQTY}`);
        log(`Logistics Fees: ${this.logisticsFees}`);
        log(`Processing Fee: ${this.processingFee}`);
        log(`Standard PMO Cost: ${this.standardPMOCost}`);
        log(`Extra PMO Cost: ${this.extraPMOCost}`);
        log(`Processing Uplift: ${this.processingUplift}`);
        log(`Customer PRV: ${this.customerPRV}`);
        log(`Diff1: ${this.Diff1}`);
        log(`Diff2: ${this.Diff2}`);
        log(`PMO Allocation: ${this.PMOAllocation}`);
        log(`Lenovo Total Revenue: ${this.LenovoTotalRev}`);
        log(`Lenovo Total Cost: ${this.LenovoTotalCost}`);
        log(`Lenovo GP: ${this.LenovoGP}`);
    }

    static roundOff(value: number): number {
  return Number(value.toFixed(2));
}
constructor() { }

 static async productCount() {

        const productMap = new Map<string, number>();
        for (let i = 3; i < 13; i++) {
            let product: any = (await BidExcelCalculations.readExcel("Product Details")).getCell(`A${i}`).value;
            let quantity = BidExcelCalculations.toNumber((await BidExcelCalculations.readExcel("Product Details")).getCell(`D${i}`).value);

            if (!product || isNaN(quantity)) return;

            if (productMap.has(product)) {
                const prev = productMap.get(product) || 0;
                productMap.set(product, prev + quantity);
            } else {
                productMap.set(product, quantity);
            }

        }
        //let totalStandardFees = 0;
        for (const [product, quantity] of productMap) {
       const stanardFees = productType[product];
            this.lenovoProcessingCharge += stanardFees * quantity;
            log(`Standard Fees for ${product} : ${stanardFees}`);
// console.log(product, quantity);
        }
       

    }
}

