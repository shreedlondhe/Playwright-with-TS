import { Page, Locator } from "@playwright/test";
import TestUtils from "../utils/TestUtils.ts";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";
import { getBidId } from "./CreateBid.ts";
import { log } from "../utils/Logger.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import {productType}  from "C:/Users/Admin/Downloads/PyxTech/pages/Tech_CertCalculations.ts";



export default class BidExcelCalculations {
    

    constructor() {

    }

    static remarketingvalue: number = 0;
    static totalAssetCount: number = 0;
    static totalEstimateLogisticsFees: number = 0;
    static EstimateProcessingFee: number = 0;
    static netAmount: number = 0;


    static sheet: ExcelJS.Worksheet | undefined;
    static async allExcelCalculation() {
        await this.getRemarketingValue();
        await this.getTotalAssets();
        await this.getTotalEstimateLogisticsFee();
        await this.getTotalEstimateServiceFee();
        await this.getNetAmount();
       
    }

    


    static async readExcel(sheetName: string): Promise<ExcelJS.Worksheet> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePaths.filePathForEdit);
        const sheet = workbook.getWorksheet(sheetName);
        if (!sheet) {
            throw new Error(`Sheet ${sheetName} not found in Excel file`);
        }
        return sheet;
    }

    static async getRemarketingValue() {
        //  this.remarketingvalue = 0;
        for (let i = 3; i < 13; i++) {
            let dValue = this.toNumber((await this.readExcel("Product Details")).getCell(`D${i}`).value);
            let qValue = this.toNumber((await this.readExcel("Product Details")).getCell(`Q${i}`).value);
            this.remarketingvalue += this.toNumber(dValue) * this.toNumber(qValue);
        }
        log(`Remarketing Value is = ${this.remarketingvalue}`);
    }

    static async getTotalAssets() {
        // let total = 0;
        for (let i = 3; i < 13; i++) {
            this.totalAssetCount += this.toNumber((await this.readExcel("Product Details")).getCell(`D${i}`).value);
        }
        log(`Total Assets = ${this.totalAssetCount}`);

    }

    static async getTotalEstimateLogisticsFee() {
        this.totalEstimateLogisticsFees = this.toNumber((await this.readExcel("Overview")).getCell(`D19`).value);
        log(`Total Estimate Logistics Fee = ${this.totalEstimateLogisticsFees}`);
    }


    static async getTotalEstimateServiceFee() {
        // let EstimateServiceFee = 0;
        for (let i = 3; i < 13; i++) {
            let dValue = this.toNumber((await this.readExcel("Product Details")).getCell(`D${i}`).value);
            let qValue = this.toNumber((await this.readExcel("Product Details")).getCell(`P${i}`).value);
            this.EstimateProcessingFee += this.toNumber(dValue) * this.toNumber(qValue);
        }
        log(`Total Estimate Service Fee is = ${this.EstimateProcessingFee}`);

    }


    static async getNetAmount() {
        this.netAmount = this.remarketingvalue - this.totalEstimateLogisticsFees - this.EstimateProcessingFee
        log(`Net Amount is = ${this.netAmount}`);

    }

    static async productCount() {

        const productMap = new Map<string, number>();
        for (let i = 3; i < 13; i++) {
            let product: any = (await this.readExcel("Product Details")).getCell(`A${i}`).value;
            let quantity = this.toNumber((await this.readExcel("Product Details")).getCell(`D${i}`).value);

            if (!product || isNaN(quantity)) return;

            if (productMap.has(product)) {
                const prev = productMap.get(product) || 0;
                productMap.set(product, prev + quantity);
            } else {
                productMap.set(product, quantity);
            }

        }

        for (const [product, quantity] of productMap) {

            const stanardFees= productType[product];
            console.log(`Standard Fees for ${product} : ${stanardFees}`);

           // console.log(product, quantity);
        }

        //console.log(productMap)

    }




















    static toNumber(value: any): number {
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
}
