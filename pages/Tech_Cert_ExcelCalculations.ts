import TestUtils from "../utils/TestUtils.ts";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";
import { log } from "../utils/Logger.ts";
import BidExcelCalculations from "./BidExcelCalculations.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import { Page } from "playwright-core";


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
    "Storage (1 Drive)": 0,
    "Additional Server or Storage Drives": 0,
    "Loose Media Drive (SSD, HDD, etc.)": 0,
    "Loose Tape Drive": 0,
    // "Multi-function Device (<22.7 kg, Printer, Copier, Scanner, Fax)": 4,
    "Networking (Switch, Router, Hub, UPS)": 10.25,
    "Small Serialized Assets (<1.4 kg, any peripheral not included in other categories)": 4,
    "Medium Assets (1.4 kg - 22.7 kg, any peripheral not included in other categories)": 10.25,
    "Large Assets (>=22.7 kg, any peripheral not included in other categories)": 5.25,
    "IT Spam (Cabling, Keyboards, Mice, etc.)": 5.25

};

export default class TechCertCalculations {
    constructor(private page: Page) { }

    async toNumber(value: any): Promise<number> {
        if (value == null) return 0;
        if (typeof value === "object") {
            if ("result" in value) {
                return Number(value.result) || 0;
            }
            return 0;
        }
        if (typeof value === "number") {
            return value;
        }
        return Number(value) || 0;
    }

    async readExcel(sheetName: string): Promise<ExcelJS.Worksheet> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePaths.filePathForEdit);
        const sheet = workbook.getWorksheet(sheetName);
        if (!sheet) {
            throw new Error(`Sheet ${sheetName} not found in Excel file`);
        }
        return sheet;
    }



    lenovoProcessingCharge = 0;
    grossRemarketingValue = 0;
    assetQTY = 0;
    logisticsFees = 0;
    processingFee = 0;
    standardPMOCost = 276;
    extraPMOCost = 23;
    processingUplift = 0;
    customerPRV = 0;
    Diff1 = 0;
    Diff2 = 0;
    PMOAllocation = 0;
    LenovoTotalRev = 0;
    LenovoTotalCost = 0;
    LenovoGP = 0;


    async finalTechCertCalculations(remarketingvalue: number, totalAssetCount: number, totalEstimateLogisticsFees: number, EstimateProcessingFee: number) {
        await this.productCount();
        this.grossRemarketingValue = remarketingvalue;
        this.assetQTY = totalAssetCount;
        this.logisticsFees = totalEstimateLogisticsFees;
        this.processingFee = EstimateProcessingFee;
        this.processingUplift = this.roundOff(this.processingFee - this.lenovoProcessingCharge);
        this.customerPRV = this.roundOff(this.grossRemarketingValue - (this.grossRemarketingValue * 0.10));
        this.Diff1 = this.roundOff(this.grossRemarketingValue - this.customerPRV);
        this.Diff2 = this.roundOff(this.processingFee - this.lenovoProcessingCharge);
        this.PMOAllocation = this.roundOff(this.standardPMOCost + this.extraPMOCost);
        this.LenovoTotalRev = this.roundOff(this.lenovoProcessingCharge + this.logisticsFees + this.grossRemarketingValue);
        this.LenovoTotalCost = this.roundOff(this.customerPRV + this.processingFee + this.logisticsFees + this.PMOAllocation);
        this.LenovoGP = this.roundOff(this.LenovoTotalRev - this.LenovoTotalCost);
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

    roundOff(value: number): number {
        return Number(value.toFixed(2));
    }


    async productCount() {

        const productMap = new Map<string, number>();
        for (let i = 3; i <= dynamicData.noOFRows; i++) {
            let product: any = (await this.readExcel("Product Details")).getCell(`A${i}`).value;
            let quantity = await this.toNumber((await this.readExcel("Product Details")).getCell(`D${i}`).value);

            // if (!product || isNaN(quantity)) return;

            if (productMap.has(product)) {
                const prev = productMap.get(product) || 0;
                productMap.set(product, prev + quantity);
            } else {
                productMap.set(product, quantity);
            }

        }
        //  console.log(productMap);
        //let totalStandardFees = 0;
        for (const [product, quantity] of productMap) {
            const stanardFees = productType[product];
            this.lenovoProcessingCharge += stanardFees * quantity;
            log(`Standard Fees for ${product} : ${stanardFees}`);
            //  console.log(product, quantity);
        }


    }


}
