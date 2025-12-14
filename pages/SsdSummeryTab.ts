import { Page, Locator } from "@playwright/test";
import TestUtils from "../utils/TestUtils.ts";
import path from 'path'
import ExcelJS from "exceljs";
import { filePaths } from "../utils/FilePath.ts";
import { getBidId } from "./CreateBid.ts";
import { log } from "../utils/Logger.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import { productType } from "./Tech_Cert_ExcelCalculations.ts";
import { cs_CZ } from "@faker-js/faker";



export default class SsdSummeryTab {

    Country: Locator;
    Currency: Locator
    Customer: Locator;
    CollectionAddress: Locator;
    LogisticsServiceType: Locator;
    DataSecurityType: Locator;
    SpecialServicesRequest1: Locator;
    SpecialServicesRequest2: Locator;
    Notes: Locator;

    countryFromUi: string ="";
    currencyFromUi: string ="";
    customerFromUi: string ="";
    collectionAddressFromUi: string ="";
    logisticsServiceTypeFromUi: string ="";
    dataSecurityTypeFromUi: string ="";
    specialServicesRequest1FromUi: string ="";
    specialServicesRequest2FromUi: string ="";
    notesFromUi: string ="";

    countryFromInventoryForm: string ="";
    currencyFromInventoryForm: string ="";
    customerFromInventoryForm: string ="";
    collectionAddressFromInventoryForm: string ="";
    logisticsServiceTypeFromInventoryForm: string ="";
    dataSecurityTypeFromInventoryForm: string ="";
    specialServicesRequest1FromInventoryForm: string ="";
    specialServicesRequest2FromInventoryForm: string ="";
    notesFromInventoryForm: string ="";


    constructor(private page: Page) { 
        this.Country = page.locator("//div[text()='Country']/following-sibling::div");
        this.Currency = page.locator("//div[text()='Currency']/following-sibling::div");
        this.Customer = page.locator("//div[text()='Customer']/following-sibling::div");
        this.CollectionAddress = page.locator("//div[text()='Collection Address']/following-sibling::div");
        this.LogisticsServiceType = page.locator("//div[text()='Logistics Service Type']/following-sibling::div");
        this.DataSecurityType = page.locator("//div[text()='Data Security Type']/following-sibling::div");
        this.SpecialServicesRequest1 = page.locator("(//div[text()='Special Services Request']/following-sibling::div)[1]");
        this.SpecialServicesRequest2 = page.locator("(//div[text()='Special Services Request']/following-sibling::div)[2]");
        this.Notes = page.locator("//div[text()='Notes:']/following-sibling::div");
}

    async getSummeryTabData() { 
        await this.selectBid();  
        this.countryFromUi= await TestUtils.getText(this.Country,'Extracting Country from Summery Tab'); 
        this.currencyFromUi= await TestUtils.getText(this.Currency,'Extracting Currency from Summery Tab'); 
        this.customerFromUi= await TestUtils.getText(this.Customer,'Extracting Customer from Summery Tab'); 
        this.collectionAddressFromUi= await TestUtils.getText(this.CollectionAddress,'Extracting Collection Address from Summery Tab'); 
        this.logisticsServiceTypeFromUi= await TestUtils.getText(this.LogisticsServiceType,'Extracting Logistics Service Type from Summery Tab'); 
        this.dataSecurityTypeFromUi= await TestUtils.getText(this.DataSecurityType,'Extracting Data Security Type from Summery Tab'); 
        this.specialServicesRequest1FromUi= await TestUtils.getText(this.SpecialServicesRequest1,'Extracting Special Services Request 1 from Summery Tab'); 
        this.specialServicesRequest2FromUi= await TestUtils.getText(this.SpecialServicesRequest2,'Extracting Special Services Request 2 from Summery Tab'); 
        this.notesFromUi= await TestUtils.getText(this.Notes,'Extracting Notes from Summery Tab'); 
        await this.getDataFromInventoryForm();
        await this.verifySummeryTabDataWithInventoryFormData();
       // await this.logAllValues();

    }

    async getDataFromInventoryForm(){
        this.countryFromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D8`).value as string;
        this.currencyFromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D10`).value as string;
        this.collectionAddressFromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D7`).value as string;
        this.logisticsServiceTypeFromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D11`).value as string;
        this.dataSecurityTypeFromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D12`).value as string;
        this.specialServicesRequest1FromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D13`).value as string;
        this.specialServicesRequest2FromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D14`).value as string;
        this.notesFromInventoryForm= (await TestUtils.readExcelAndGetData('Overview', filePaths.filePathForEdit)).getCell(`D15`).value as string;
    }
    async verifySummeryTabDataWithInventoryFormData(){
        log(`Verifying Summery Tab data with Inventory Form data`);
        await TestUtils.expectStringEquals(this.countryFromUi,this.countryFromInventoryForm,'Verifying Country from Summery Tab with Inventory Form');
        await TestUtils.expectStringEquals(this.currencyFromUi,this.currencyFromInventoryForm,'Verifying Currency from Summery Tab with Inventory Form');
        await TestUtils.expectStringEquals(this.collectionAddressFromUi,this.collectionAddressFromInventoryForm,'Verifying Collection Address from Summery Tab with Inventory Form');
        await TestUtils.expectStringEquals(this.logisticsServiceTypeFromUi,this.logisticsServiceTypeFromInventoryForm,'Verifying Logistics Service Type from Summery Tab with Inventory Form');
        await TestUtils.expectStringEquals(this.dataSecurityTypeFromUi,this.dataSecurityTypeFromInventoryForm,'Verifying Data Security Type from Summery Tab with Inventory Form');
        await TestUtils.expectStringEquals(this.specialServicesRequest1FromUi,this.specialServicesRequest1FromInventoryForm,'Verifying Special Services Request 1 from Summery Tab with Inventory Form');
        await TestUtils.expectStringEquals(this.specialServicesRequest2FromUi,this.specialServicesRequest2FromInventoryForm,'Verifying Special Services Request 2 from Summery Tab with Inventory Form');
        await TestUtils.expectStringEquals(this.notesFromUi,this.notesFromInventoryForm,'Verifying Notes from Summery Tab with Inventory Form');
        log(`Verified Summery Tab data with Inventory Form data successfully`); 
    }

    async logAllValues(){
        log(`Customer from Name is : ${this.customerFromUi}`);
        log(`Country from Inventory Form : ${this.countryFromInventoryForm} Country from UI : ${this.countryFromUi}`);
        log(`Currency from Inventory Form is : ${this.currencyFromInventoryForm} Currency from UI : ${this.currencyFromUi}`);
        log(`Collection Address from Inventory Form : ${this.collectionAddressFromInventoryForm} Collection Address from UI : ${this.collectionAddressFromUi}`);
        log(`Logistics Service from Inventory Form : ${this.logisticsServiceTypeFromInventoryForm} Logistics Service from UI : ${this.logisticsServiceTypeFromUi}`);
        log(`Data Security from Inventory Form : ${this.dataSecurityTypeFromInventoryForm}  Data Security from UI : ${this.dataSecurityTypeFromUi}`);
        log(`Special Services Request 1 from Inventory Form : ${this.specialServicesRequest1FromInventoryForm}  Special Services Request 1 from UI : ${this.specialServicesRequest1FromUi}`);
        log(`Special Services Request 2 from Inventory Form : ${this.specialServicesRequest2FromInventoryForm} Special Services Request 2 from UI : ${this.specialServicesRequest2FromUi}`);
        log(`Notes from Inventory Form is  : ${this.notesFromInventoryForm} Notes from UI : ${this.notesFromUi}`);
    }

     bidId: string = "";
        async selectBid() {
            this.bidId = await getBidId();
            const bidToSelect = this.page.locator(`//td[text()='${this.bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);
            log(`Bid Id : ${this.bidId}`);
            await TestUtils.click(bidToSelect, "Selecting Bid")
        }

}