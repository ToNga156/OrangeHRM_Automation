import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class EmployeeDetailPage extends BasePage {
    readonly txtPersonalDetails: Locator;

    constructor(page: Page) {
        super(page);
        this.txtPersonalDetails = page.getByRole('heading', {name:'Personal Details'});
    }

}