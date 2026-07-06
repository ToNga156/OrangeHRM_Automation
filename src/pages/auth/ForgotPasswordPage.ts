import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ForgotPasswordPage extends BasePage {
    readonly txtUsername: Locator;
    readonly btnResetPassword: Locator;
    readonly btnCancel: Locator;
    readonly lblForgotPassword: Locator;
    readonly lblResetSuccess: Locator;

    constructor(page: Page) {
        super(page);

        this.lblForgotPassword = page.getByRole('heading', {
            name: 'Reset Password'
        });

        this.txtUsername = page.locator('input[name="username"]');

        this.btnResetPassword = page.getByRole('button', {
            name: 'Reset Password'
        });

        this.btnCancel = page.getByRole('button', {
            name: 'Cancel'
        });

        this.lblResetSuccess = page.locator('.oxd-text--h6');
    }

    async enterUsername(username: string): Promise<void> {
        await this.fill(this.txtUsername, username);
    }

    async clickResetPassword(): Promise<void> {
        await this.click(this.btnResetPassword);
    }

    async clickCancel(): Promise<void> {
        await this.click(this.btnCancel);
    }

    async resetPassword(username: string): Promise<void> {
        await this.enterUsername(username);
        await this.clickResetPassword();
    }

    async verifyForgotPasswordPage(): Promise<void> {
        await expect(this.page).toHaveURL(/requestPasswordResetCode/);
        await expect(this.lblForgotPassword).toBeVisible();
    }

    async verifyResetPasswordSuccess(): Promise<void> {
        await expect(this.lblResetSuccess).toContainText('Reset Password link sent successfully');
    }
}