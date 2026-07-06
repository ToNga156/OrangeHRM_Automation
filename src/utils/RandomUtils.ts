export class RandomUtils {
    static randomNumber(min: number = 1000, max: number = 9999): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static timestamp(): number {
        return Date.now();
    }

    static unique(prefix: string): string {
        return `${prefix}${this.timestamp()}`;
    }

    static firstName(): string {
        return `John${this.randomNumber()}`;
    }

    static middleName(): string {
        return `David${this.randomNumber()}`;
    }

    static lastName(): string {
        return `Smith${this.randomNumber()}`;
    }

    static employeeId(): string {
        return this.randomNumber(100000, 999999).toString();
    }

}