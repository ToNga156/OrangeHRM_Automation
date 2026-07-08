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

    static assignedLeave(): Leave {
        return {
            employeeName: 'Paul Collings',
            leaveType: 'CAN - Vacation',
            fromDate: DateUtils.futureDate(2),
            toDate: DateUtils.futureDate(4),
            comment: 'Automation Testing'
        };
    }

}