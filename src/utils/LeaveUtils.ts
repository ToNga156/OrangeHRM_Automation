import { Leave } from '../models/Leave';
import { DateUtils } from './DateUtils';

export class LeaveUtils {
    static leave(): Leave {
        return {
            leaveType: 'CAN - Vacation',
            fromDate: DateUtils.futureDate(2),
            toDate: DateUtils.futureDate(4),
            comment: 'Automation Testing'
        };
    }

    static invalidDateRange(): Leave {
        return {
            leaveType: 'CAN - Vacation',
            fromDate: DateUtils.futureDate(5),
            toDate: DateUtils.futureDate(2),
            comment: 'Automation Testing'
        };
    }

    static exceedBalanceLeave(): Leave {
        return {
            leaveType: 'CAN - Vacation',
            fromDate: DateUtils.futureDate(2),
            toDate: DateUtils.futureDate(40),
            comment: 'Automation Testing'
        };
    }
}