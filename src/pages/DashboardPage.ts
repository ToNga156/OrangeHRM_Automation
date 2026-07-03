import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    readonly txtDashboard: Locator;
    readonly userDropdown: Locator;
    readonly btnLogout: Locator;

    constructor(page: Page) {
        super(page);

        this.txtDashboard = page.getByRole('heading', {
            name: 'Dashboard'
        });

        this.userDropdown = page.locator('.oxd-userdropdown-tab');

        this.btnLogout = page.getByRole('menuitem', {
            name: 'Logout'
        });
    }

    async openUserDropdown(): Promise<void> {
        await this.click(this.userDropdown);
    }

    async clickLogout(): Promise<void> {
        await this.click(this.btnLogout);
    }
    
    async logout(): Promise<void> {
        await this.openUserDropdown();
        await this.clickLogout();
    }
}