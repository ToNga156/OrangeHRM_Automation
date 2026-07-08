import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Leave } from '../../models/Leave';

export class AssignLeavePage extends BasePage {

    readonly menuAssignLeave: Locator;

    readonly txtEmployeeName: Locator;

    readonly leaveTypeDropdown: Locator;
    readonly leaveTypeOptions: Locator;

    readonly txtFromDate: Locator;
    readonly txtToDate: Locator;

    readonly txtComment: Locator;

    readonly btnAssign: Locator;
    readonly btnConfirmAssign: Locator;

    readonly toastSuccess: Locator;

    readonly lblRequiredEmployee: Locator;
    readonly lblRequiredLeaveType: Locator;
    readonly lblSubmitFailed: Locator;

    constructor(page: Page) {
        super(page);

        this.menuAssignLeave = page.getByRole('link', {
            name: 'Assign Leave'
        });

        this.txtEmployeeName = page
            .getByPlaceholder('Type for hints...')
            .first();

        this.leaveTypeDropdown = page.locator(
            '.oxd-input-group:has-text("Leave Type") .oxd-select-text'
        );

        this.leaveTypeOptions = page.locator(
            '.oxd-select-dropdown .oxd-select-option'
        );

        this.txtFromDate = page
            .getByRole('textbox', {
                name: 'yyyy-dd-mm'
            })
            .first();

        this.txtToDate = page
            .getByRole('textbox', {
                name: 'yyyy-dd-mm'
            })
            .nth(1);

        this.txtComment = page.locator('textarea');

        this.btnAssign = page.getByRole('button', {
            name: 'Assign'
        });

        this.btnConfirmAssign = page.getByRole('button', {
            name: 'Ok'
        });

        this.toastSuccess = page.locator('.oxd-toast');

        this.lblRequiredEmployee = page
            .locator('.oxd-input-field-error-message')
            .first();

        this.lblRequiredLeaveType = page
            .locator('.oxd-input-field-error-message')
            .nth(1);

        this.lblSubmitFailed = page.getByText(
            'Warning to Submit Fail'
        );
    }

    async openAssignLeave(): Promise<void> {
        await this.click(this.menuAssignLeave);
    }

    async enterEmployeeName(employeeName: string): Promise<void> {

        await this.fill(
            this.txtEmployeeName,
            employeeName
        );

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

    async enterComment(comment: string): Promise<void> {

        await this.fill(
            this.txtComment,
            comment
        );

    }

    async clickAssign(): Promise<void> {

        await this.click(this.btnAssign);

    }

    async confirmAssign(): Promise<void> {

        if (await this.btnConfirmAssign.isVisible()) {
            await this.click(this.btnConfirmAssign);
        }

    }

    async assignLeave(leave: Leave): Promise<void> {

        if (leave.employeeName) {
            await this.enterEmployeeName(
                leave.employeeName
            );
        }

        await this.selectLeaveType(
            leave.leaveType
        );

        await this.enterFromDate(
            leave.fromDate
        );

        await this.enterToDate(
            leave.toDate
        );

        await this.enterComment(
            leave.comment
        );

        await this.clickAssign();

        await this.confirmAssign();

    }

    async verifyAssignSuccess(): Promise<void> {

        await expect(this.toastSuccess)
            .toContainText('Success');

    }

    async verifyRequiredEmployee(): Promise<void> {

        await expect(this.lblRequiredEmployee)
            .toHaveText('Required');

    }

    async verifyRequiredLeaveType(): Promise<void> {

        await expect(this.lblRequiredLeaveType)
            .toHaveText('Required');

    }

    async verifySubmitFailed(): Promise<void> {

        await expect(this.lblSubmitFailed)
            .toBeVisible();

    }

}