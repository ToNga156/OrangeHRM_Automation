import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from '../BasePage';

export class EntitlementsPage extends BasePage {
    readonly menuEntitlements: Locator;
    readonly menuMyEntitlements: Locator;
    readonly tblEntitlements: Locator;
    readonly entitlementRows: Locator;

    constructor(page: Page) {
        super(page);

        this.menuEntitlements = page.getByRole('link', {name: 'Entitlements'});
        this.menuMyEntitlements = page.getByRole('link', {name: 'My Entitlements'});
        this.tblEntitlements = page.locator('.oxd-table-body');
        this.entitlementRows = page.locator('.oxd-table-card');
    }

    async openMyEntitlements(): Promise<void> {
        await this.hover(this.menuEntitlements);
        await this.click(this.menuMyEntitlements);
    }

    async verifyEntitlementSummaryDisplayed(): Promise<void> {
        await expect(this.tblEntitlements).toBeVisible();
        await expect(this.entitlementRows.first()).toBeVisible();
    }
}