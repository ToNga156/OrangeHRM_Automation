import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ForgotPasswordPage extends BasePage {
    readonly txtUsername: Locator;
    readonly btnResetPassword: Locator;
    readonly btnCancel: Locator;
    readonly lblResetSuccess: Locator;

    constructor(page: Page) {
        super(page);

        this.txtUsername = page.locator('input[name="username"]');

        this.btnResetPassword = page.getByRole('button', {
            name: 'Reset Password'
        });

        this.btnCancel = page.getByRole('button', {
            name: 'Cancel'
        });

        this.lblResetSuccess = page.locator('.orangehrm-card-container h6');
    }

    async enterUsername(username: string): Promise<void> {
        await this.fill(this.txtUsername, username);
    }

    async clickResetPassword(): Promise<void> {
        await this.click(this.btnResetPassword);
    }

    async resetPassword(username: string): Promise<void> {
        await this.enterUsername(username);
        await this.clickResetPassword();
    }

}