class DateHelper {
    static getDateDifferenceDays(startDate: Date, endDate: Date) {
        const secondsToEnd = endDate.getTime() - startDate.getTime();
        return secondsToEnd / (1000 * 3600 * 24);
    }

    static formatDateToStr(date: Date) {
        return date.toISOString().split("T")[0];
    }
}

export default DateHelper;
