import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Leave } from '../../models/Leave';

export class ApplyLeavePage extends BasePage {

    readonly menuApply: Locator;

    readonly leaveTypeDropdown: Locator;
    readonly leaveTypeOptions: Locator;

    readonly txtFromDate: Locator;
    readonly txtToDate: Locator;
    readonly txtDuration: Locator;
    readonly txtComment: Locator;

    readonly btnApply: Locator;

    readonly toastSuccess: Locator;
    readonly lblSubmitFailed: Locator;
    readonly lblToDateValidation: Locator;

    constructor(page: Page) {
        super(page);

        this.menuApply = page.getByRole('link', {
            name: 'Apply'
        });

        this.leaveTypeDropdown = page.locator(
            '.oxd-input-group:has-text("Leave Type") .oxd-select-text'
        );

        this.leaveTypeOptions = page.locator(
            '.oxd-select-dropdown .oxd-select-option'
        );

        this.txtFromDate = page.getByRole('textbox', {
            name: 'yyyy-dd-mm'
        }).first();

        this.txtToDate = page.getByRole('textbox', {
            name: 'yyyy-dd-mm'
        }).nth(1);

        this.txtDuration = page.locator(
            '.oxd-input-group:has-text("Duration") .oxd-select-text-input'
        );

        this.txtComment = page.locator('textarea');

        this.btnApply = page.getByRole('button', {
            name: 'Apply'
        });

        this.toastSuccess = page.locator('.oxd-toast');

        this.lblSubmitFailed = page.getByText(
            'Warning to Submit Fail'
        );
        this.lblToDateValidation = page.getByText(
            'To date should be after from date'
        );
    }

    async openApplyPage(): Promise<void> {
        await this.click(this.menuApply);
    }

    async selectLeaveType(type: string): Promise<void> {

        await this.click(this.leaveTypeDropdown);

        await this.leaveTypeOptions
            .first()
            .waitFor({
                state: 'visible'
            });

        await this.leaveTypeOptions
            .filter({
                hasText: type
            })
            .first()
            .click();
    }

    async enterFromDate(date: string): Promise<void> {

        await this.txtFromDate.clear();

        await this.fill(
            this.txtFromDate,
            date
        );
    }

    async enterToDate(date: string): Promise<void> {

        await this.txtToDate.clear();

        await this.fill(
            this.txtToDate,
            date
        );
    }

    async verifyDefaultDuration(): Promise<void> {

        await expect(this.txtDuration)
            .toHaveText('Full Day');

    }

    async enterComment(comment: string): Promise<void> {

        await this.fill(
            this.txtComment,
            comment
        );
    }

    async clickApply(): Promise<void> {

        await this.click(this.btnApply);
    }

    async applyLeave(leave: Leave): Promise<void> {

        await this.selectLeaveType(
            leave.leaveType
        );

        await this.enterFromDate(
            leave.fromDate
        );

        await this.enterToDate(
            leave.toDate
        );

        await this.verifyDefaultDuration();

        await this.enterComment(
            leave.comment
        );

        await this.clickApply();
    }

    async createLeaveRequest(leave: Leave): Promise<void> {

        await this.openApplyPage();

        await this.applyLeave(leave);

        await this.verifyLeaveAppliedSuccessfully();
    }

    async verifyLeaveAppliedSuccessfully(): Promise<void> {

        await expect(this.toastSuccess)
            .toContainText('Success');
    }

    async verifySubmitFailed(): Promise<void> {

        await expect(this.lblSubmitFailed)
            .toBeVisible();
    }

    async verifyToDateValidation(): Promise<void> {
        await expect(this.lblToDateValidation)
            .toBeVisible();

    }
}