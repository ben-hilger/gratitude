export function getFirstDayOfWeek(date: Date) {
    const dayWeekday = date.getDay();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayWeekday, 0, 0, 0, 0);
}

export function getLastDayOfWeek(date: Date) {
    const endDateWeekDay = date.getDay();
    const daysAfter = 6 - endDateWeekDay
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysAfter, 0, 0, 0, 0);
}

export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];

    const numberOfDays = numberOfDaysBetween(startDate, endDate);

    for (let i = 0; i <= numberOfDays; i++) {
        const dateToAdd = new Date();
        dateToAdd.setTime(startDate.getTime());
        dateToAdd.setDate(startDate.getDate() + i);
        dates.push(dateToAdd);
    }

    return dates;
}

export function numberOfDaysBetween(startDate: Date, endDate: Date): number {
    const millisDiff = endDate.getTime() - startDate.getTime();
    return Math.round(millisDiff / (24 * 60 * 60 * 1000));
}