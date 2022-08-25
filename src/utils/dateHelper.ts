class DateHelper {
    static getDateDifferenceDays(startDate: Date, endDate: Date) {
        const secondsToEnd = endDate.getTime() - startDate.getTime();
        return secondsToEnd / (1000 * 3600 * 24);
    }

    static formatDateToStr(date: Date) {
        return date.toISOString().split('T')[0];
    }

    static addMonth(date: Date, value: number) {
        return new Date(date.setMonth(date.getMonth() + value));
    }

    static addYear(date: Date, value: number) {
        return new Date(date.setFullYear(date.getFullYear() + value));
    }

    static getAppDate(date: Date) {
        const options = {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
        };

        return date
            .toLocaleString('ru-RU', options as Intl.DateTimeFormatOptions)
            .slice(0, -3)
            .replace(/\./g, '');
    }
}

export default DateHelper;
