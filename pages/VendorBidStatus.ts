import { expect, Page, Locator } from "@playwright/test";
import path from 'path'
import TestUtils from "../utils/TestUtils.ts";
import { allure } from 'allure-playwright';
import { filePaths } from "../utils/FilePath.ts";
import { dynamicData } from "../utils/DynamicDataGenerator.ts";
import { log } from "../utils/Logger.ts";
import { getBidId } from "./CreateBid.ts";

export default class VendorBidStatus {
    decline: Locator
    yes: Locator
    ok: Locator
    dashboard: Locator
    // bidToSelectt:Locator


    constructor(private page: Page) {
        this.decline = page.getByRole('button', { name: 'Decline' })
        this.yes = page.getByRole('button', { name: 'Yes' })
        this.ok = page.getByRole('button', { name: 'OK' })
        this.dashboard = page.getByText('Dashboard')
        // this.bidToSelectt =page.locator(`//td[text()='${this.bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);

    }


    bidId: string = "";
    async selectBid() {
        this.bidId = await getBidId();
        const bidToSelect = this.page.locator(`//td[text()='${this.bidId}']/..//td//div//div/i[@class='dx-icon dx-icon-eyeopen']`);
        log(`Bid Id : ${this.bidId}`);
        await TestUtils.click(bidToSelect, "Selecting Bid")
    }
    async declineBid() {
        await this.selectBid();
        await TestUtils.click(this.decline, `Clicking on decline`);
        await TestUtils.click(this.yes, `Clicking on yes `);
        await TestUtils.click(this.ok, `Clicking on ok `);
        await this.getStatus('Declined')
    }
    async getStatus(status: string) {
        await TestUtils.click(this.dashboard, `Clicking on dashboard`);
        const statusLocator = await this.page.locator(`//td[normalize-space()='${this.bidId}']/following-sibling::td[4]`);
        await TestUtils.expectToContainText(statusLocator, status, `Verifying status : ${status}`)
    }





}