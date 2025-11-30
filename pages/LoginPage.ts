import { Page } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import {log} from "../utils/logger";
import { credentials } from '../utils/test-data';
import defineConfig from "../playwright.config"


export default class LoginPage {
  constructor(private page: Page) {}

   username: string = "//input[@name='email']";
    password: string = "//input[@name='encrPassword']"
    loginButton: string = "//span[text()='Login']";
    async loginToApplication(userName: string, password: string) {
        await TestUtils.fill(this.page, this.username, userName, 'Filling username');
        await TestUtils.fill(this.page, this.password, password, 'Filling password');
       await TestUtils.click(this.page, this.loginButton, 'Clicking on login button');
        
    }
    async goto() {
      
    await this.page.goto('/');
    const currentUrl = this.page.url();
      log("URL: "+currentUrl);
  }

}