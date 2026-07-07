import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class DashboardPage extends BasePage {
    readonly txtDashboard: Locator;
    readonly menuPIM: Locator;
    readonly userDropdown: Locator;
    readonly btnLogout: Locator;
    readonly lnkLeave: Locator;

    constructor(page: Page) {
        super(page);
        this.txtDashboard = page.getByRole('heading', {name: 'Dashboard'});
        this.menuPIM = page.getByRole('link', {name: 'PIM'});
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.btnLogout = page.getByRole('menuitem', {name: 'Logout'});
        this.lnkLeave = page.getByRole('link', {name: 'Leave'});
    }

    async openPIM(): Promise<void> {
        await this.click(this.menuPIM);
    }

    async clickUserDropdown(): Promise<void> {
        await this.click(this.userDropdown);
    }

    async logout(): Promise<void> {
        await this.clickUserDropdown();
        await this.click(this.btnLogout);
    }

    async verifyDashboardPage(): Promise<void> {
        await expect(this.page).toHaveURL(/dashboard/);
        await expect(this.txtDashboard).toBeVisible();
    }

    async openLeave(): Promise<void> {
        await this.click(this.lnkLeave);
    }
}