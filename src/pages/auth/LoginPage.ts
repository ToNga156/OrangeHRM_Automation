import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { config } from '../../utils/config';

export class LoginPage extends BasePage {
    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly lnkForgotPassword: Locator;
    readonly lblInvalidCredentials: Locator;
    readonly lblRequired: Locator;

    constructor(page: Page) {
        super(page);
        this.txtUsername = page.locator('input[name="username"]');
        this.txtPassword = page.locator('input[name="password"]');
        this.btnLogin = page.locator('button[type="submit"]');
        this.lnkForgotPassword = page.getByText('Forgot your password?');
        this.lblInvalidCredentials = page.locator('.oxd-alert-content-text');
        this.lblRequired = page.locator('.oxd-input-field-error-message');
    }

    async open(): Promise<void> {
        await this.navigate(config.baseUrl);
    }

    async enterUsername(username: string): Promise<void> {
        await this.fill(this.txtUsername, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(this.txtPassword, password);
    }

    async clickLogin(): Promise<void> {
        await this.click(this.btnLogin);
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async clickForgotPassword(): Promise<void> {
        await this.click(this.lnkForgotPassword);
    }
}