import { Page, Locator } from "@playwright/test";
import TestUtils from "../utils/TestUtils";
import { log } from "../utils/logger";
import { credentials } from '../utils/test-data';
import defineConfig from "../playwright.config"


export default class LoginPage {
  username: Locator
  password: Locator
  loginButton: Locator

  constructor(private page: Page) {
    this.username = page.getByRole('textbox', { name: 'Username: *' });
    this.password = page.getByRole('textbox', { name: 'Password: *' });
    this.loginButton = page.getByRole('button', { name: 'Login' })
  }

  async loginToApplication(userName: string, password: string) {
    await TestUtils.fill(this.username, userName, 'Filling username');
    await TestUtils.fill(this.password, password, 'Filling password');
    await TestUtils.click(this.loginButton, 'Clicking on login button');

  }
  async goto() {
    await this.page.goto('/');
    log("URL: " + this.page.url());
  }

}