export function incrementMonth(date: Date, change: number): Date {
    const newDate = new Date();
    const newMonth = date.getMonth() + change;
    const maxDate = getMaxDateForMonth(newMonth);
    newDate.setTime(date.getTime());
    newDate.setDate(Math.min(maxDate, date.getDate()))
    newDate.setMonth(date.getMonth() + change);
    return newDate
}

function getMaxDateForMonth(month: number) {
    const date = new Date(2024, month + 1, 0)
    return date.getDate()
}
