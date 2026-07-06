import { Employee } from '../models/Employee';

export class RandomUtils {
    private static randomNumber(length: number): string {
        return Math.random()
            .toString()
            .substring(2, 2 + length);
    }

    static firstName(): string {
        return `John${this.randomNumber(4)}`;
    }

    static middleName(): string {
        return `David${this.randomNumber(4)}`;
    }

    static lastName(): string {
        return `Smith${this.randomNumber(4)}`;
    }

    static employeeId(): string {
        return this.randomNumber(6);
    }

    static employee(): Employee {
        return {
            firstName: this.firstName(),
            middleName: this.middleName(),
            lastName: this.lastName(),
            employeeId: this.employeeId()
        };
    }
}