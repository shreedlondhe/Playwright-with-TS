import { expect, Page, Locator } from "@playwright/test";
import path from 'path'
import TestUtils from "../utils/TestUtils.ts";
import { allure } from 'allure-playwright';
import { filePaths } from "../utils/FilePath.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import { log } from "../utils/Logger.ts";
import { getBidId } from "./CreateBid.ts";
import { el } from "@faker-js/faker";

export default class BidStatus {
    bidsSection: Locator;
    techCert: Locator
    actionSymbol: Locator
    margin: Locator;
    increaseArrow: Locator;
    saveAndDownload: Locator;
    confirm: Locator;
    close: Locator;
    save: Locator
    ok: Locator
    homePage: Locator
    threeDot: Locator
    won: Locator
    lost: Locator
    lostReasonTextBox: Locator
    //save:Locator
    cancel: Locator
    yes: Locator
    //bidToSelectt:Locator

    async getStatus(status: string) {
        await TestUtils.click(this.homePage, "Clicking on Home Page")
        const statusLocator = await this.page.locator(`//td[normalize-space()='${this.bidId}']/following-sibling::td[4]`);
        await TestUtils.expectToContainText(statusLocator, status, `Verifying status : ${status}`)
    }

    async statusFlow() {
        await TestUtils.click(this.homePage, "Clicking on Home Page")
        const bidToSelect = this.page.locator(`//td[text()='${this.bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);
        await TestUtils.click(bidToSelect, "Selecting Bid")
        await TestUtils.click(this.threeDot, "Clicking on three dot")
    }

    async wonBid() {
        await this.statusFlow()
        await TestUtils.click(this.won, "Selecting Won")
        await TestUtils.click(this.ok, "Clicking on Ok")
        await this.getStatus('Won')
    }

    async lostBid() {
        await this.statusFlow()
        await TestUtils.click(this.lost, "Selecting Lost")
        await TestUtils.fill(this.lostReasonTextBox, 'Reason is', 'Filling text in Reason text box')
        await TestUtils.click(this.save, "Clicking on Save")
        await TestUtils.click(this.ok, "Clicking on Ok")
        await this.getStatus('Lost')
    }

    async CancelBid() {
        await this.statusFlow()
        await TestUtils.click(this.cancel, "Selecting cancel")
        await TestUtils.click(this.yes, "Clikcing on yes")
        await TestUtils.click(this.ok, "Clicking on Ok")
        await this.getStatus('Cancelled')
    }


    constructor(private page: Page) {

        this.bidsSection = page.getByText('BidsBids')
        this.techCert = page.getByRole('button', { name: 'Tech Cert' })
        this.actionSymbol = page.getByRole('button', { name: 'preferences' })
        this.margin = page.locator("//td[normalize-space()='Margin%']/following-sibling::td");
        this.increaseArrow = page.getByRole('spinbutton', { name: 'Lenovo PRV Margin:' })
        this.saveAndDownload = page.getByRole('button', { name: 'Save & Download' })
        this.close = page.getByRole('toolbar').filter({ hasText: 'Close' }).getByLabel('Close')
        this.confirm = page.getByRole('button', { name: 'Confirm' })
        this.save = page.getByRole('button', { name: 'Save' })
        this.ok = page.getByRole('button', { name: 'OK' })
        this.homePage = page.getByText('Home')
        this.threeDot = page.getByRole('button', { name: 'overflow' })
        this.won = page.getByRole('button', { name: 'Bid Won' })
        this.lost = page.getByRole('button', { name: 'Bid Lost' })
        this.lostReasonTextBox = page.getByRole('textbox', { name: 'Reason:' })
        //this.save=page.getByRole('button', { name: 'Save' })
        this.cancel = page.getByRole('button', { name: 'Cancel Bid Request' })
        this.yes = page.getByRole('button', { name: 'Yes' })

        //this.bidToSelectt =page.locator(`//td[text()='${this.bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);
    }

    bidId: string = "";
    async selectBid() {
        this.bidId = getBidId();
        const bidToSelect = this.page.locator(`//td[text()='${this.bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);
        log(`Bid Id : ${this.bidId}`);
        await TestUtils.click(bidToSelect, "Selecting Bid")
    }
    async confirmBid() {
        this.openTechCertSection();
        await this.setMargin();
        if(this.flag==true){
             await TestUtils.click(this.saveAndDownload, "Clicking on the save And Download")
        await TestUtils.click(this.confirm, "Clicking on the confirm")
        await TestUtils.click(this.save, "Clicking on this save")
        await TestUtils.click(this.ok, "Clicking on Ok")
        await TestUtils.click(this.close, "Clicking on close")
        await TestUtils.getScreenshot(this.page, 'Taking screenshot after logout');
        }else{
            log('Margin is in negative range, skipping the bid confirmation steps.');
        }
       
    }

async openTechCertSection(){
        await this.selectBid();
        await TestUtils.click(this.bidsSection, "Clicking on Bids section")
        await TestUtils.click(this.techCert, "Clicking on Bids TechCert")
        await TestUtils.click(this.actionSymbol, "Clicking on Bids Action Symbol")

}

async getCurrentMarginValue():Promise<number> {
     let value=await TestUtils.getText(this.margin, "Getting the margin value")
        const numericValue = value?.replace('%', '').trim();
        log(`Current Margin Value: ${numericValue}`);
        return Number(numericValue);
}

    flag:boolean=true;
    async setMargin() {
        let value=0;
    let increaseValue=10;
    let decreaseValue=10;

        while(value> 50 ||value < 20){

            if (value > 50) {
                await TestUtils.fill(this.increaseArrow, `${decreaseValue}`, `Setting margin to ${decreaseValue}%`)
                await this.page.keyboard.press('Enter');
                await TestUtils.sleep(1000)
                 value=await this.getCurrentMarginValue();
                decreaseValue+=5;
            }
            if (value < 20) {
                await TestUtils.fill(this.increaseArrow, `${increaseValue}`, `Setting margin to ${increaseValue}%`)
                await this.page.keyboard.press('Enter');
                await TestUtils.sleep(1000)
                 value=await this.getCurrentMarginValue();
                increaseValue+=5;
                if(increaseValue>60){
                    this.flag=false;
                    log('Margin is in negative range even after increasing, breaking the loop');
                    break;
                }
            }
            if(value < 50 && value > 20){
                log('Now margin is in range');
                break
            }
           
            


        }
        
    }
       

    }

