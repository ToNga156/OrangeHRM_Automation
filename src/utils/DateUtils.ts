export class DateUtils {
    static today(): string {
        return this.formatDate(new Date());
    }

    static futureDate(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return this.formatDate(date);
    }

    static pastDate(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return this.formatDate(date);
    }

    static addDays(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return this.formatDate(date);
    }

    private static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${day}-${month}`;
    }

}