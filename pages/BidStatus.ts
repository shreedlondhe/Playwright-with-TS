import { expect, Page, Locator } from "@playwright/test";
import path from 'path'
import TestUtils from "../utils/TestUtils";
import { allure } from 'allure-playwright';
import { filePaths } from "../utils/FilePath.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import { log } from "../utils/Logger.ts";
import { getBidId } from "./CreateBid";

export default class BidStatus {
    bidsSection: Locator;
    techCert: Locator
    actionSymbol: Locator
    margin: Locator;
    increaseArrow: Locator;
    saveAndDownload: Locator;
    confirm:Locator;
    close: Locator;
    save:Locator
    ok:Locator


    constructor(private page: Page) {
       
        this.bidsSection = page.getByText('BidsBids')
        this.techCert = page.getByRole('button', { name: 'Tech Cert' })
        this.actionSymbol = page.getByRole('button', { name: 'preferences' })
        this.margin = page.locator("//td[normalize-space()='Margin%']/following-sibling::td");
        this.increaseArrow = page.getByRole('spinbutton', { name: 'Lenovo PRV Margin:' })
        this.saveAndDownload = page.getByRole('button', { name: 'Save & Download' })
        this.close = page.getByRole('toolbar').filter({ hasText: 'Close' }).getByLabel('Close')
        this.confirm=page.getByRole('button', { name: 'Confirm' })
        this.save=page.getByRole('button', { name: 'Save' })
        this.ok=page.getByRole('button', { name: 'OK' })

    }

    async confirmBid() {
         const bidId = getBidId();
        const bidToSelect = this.page.locator(`//td[text()='${bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);
        log(`Bid Id : ${bidId}`);
        await TestUtils.click(bidToSelect, "Selecting Bid")
        await TestUtils.click(this.bidsSection, "Clicking on Bids section")
        await TestUtils.click(this.techCert, "Clicking on Bids TechCert")
        await TestUtils.click(this.actionSymbol, "Clicking on Bids Action Symbol")
        await this.setMargin();
        await TestUtils.click(this.saveAndDownload, "Clicking on the save And Download")
        await TestUtils.click( this.confirm, "Clicking on the confirm")
        await TestUtils.click(this.save, "Clicking on this save")
        await TestUtils.click(this.ok, "Clicking on Ok")
        await TestUtils.click(this.close, "Clicking on close")
        await TestUtils.getScreenshot(this.page, 'Taking screenshot after logout');
}

    async setMargin() {
    await TestUtils.fill(this.increaseArrow, '50',"Setting marjin to 50%")
    await this.page.keyboard.press('Enter');
    await TestUtils.sleep(1000)

    }

}