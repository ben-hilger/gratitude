import {assert, describe, test} from "vitest";
import {getDatesInRange, getFirstDayOfWeek, getLastDayOfWeek, numberOfDaysBetween} from "@/app/_lib/calendar";

describe('getting the first day of the week', () => {
    test('date that is in the middle of the week', () => {
        const date = new Date(2024, 0, 1)
        const expectedFirstDayOfWeek = new Date(2023, 11, 31)

        const actualFirstDayOfWeek = getFirstDayOfWeek(date);

        assert.equal(actualFirstDayOfWeek.toDateString(), expectedFirstDayOfWeek.toDateString(), "For 1/1/24, the expected first day of the week is 12/31/31")
    })

    test('date is at the end of the week', () => {
        const date = new Date(2024, 0, 6)
        const expectedFirstDayOfWeek = new Date(2023, 11, 31)

        const actualFirstDayOfWeek = getFirstDayOfWeek(date);

        assert.equal(actualFirstDayOfWeek.toDateString(), expectedFirstDayOfWeek.toDateString(), "For 1/1/24, the expected first day of the week is 12/31/31")
    })

    test('date that is the start of the week', () => {
        const date = new Date(2023, 11, 31)
        const expectedFirstDayOfWeek = new Date(2023, 11, 31)

        const actualFirstDayOfWeek = getFirstDayOfWeek(date);

        assert.equal(actualFirstDayOfWeek.toDateString(), expectedFirstDayOfWeek.toDateString(), "For 12/31/23, the expected first day of the week is 12/31/23")
    })
})

describe('getting the last day of the week', () => {
    test('date that is in the middle of the week', () => {
        const date = new Date(2024, 0, 1)
        const expectedLastDayOfWeek = new Date(2024, 0, 6)

        const actualFirstDayOfWeek = getLastDayOfWeek(date);

        assert.equal(actualFirstDayOfWeek.toDateString(), expectedLastDayOfWeek.toDateString(), "For 1/1/24, the expected last day of the week is 1/06/24")
    })

    test('date is at the end of the week', () => {
        const date = new Date(2024, 0, 6)
        const expectedLastDayOfWeek = new Date(2024, 0, 6)

        const actualFirstDayOfWeek = getLastDayOfWeek(date);

        assert.equal(actualFirstDayOfWeek.toDateString(), expectedLastDayOfWeek.toDateString(), "For 1/6/24, the expected last day of the week is 1/06/24")
    })

    test('date that is the start of the week', () => {
        const date = new Date(2023, 11, 31)
        const expectedLastDayOfWeek = new Date(2024, 0, 6)

        const actualFirstDayOfWeek = getLastDayOfWeek(date);

        assert.equal(actualFirstDayOfWeek.toDateString(), expectedLastDayOfWeek.toDateString(), "For 12/31/23, the expected last day of the week is 1/06/24")
    })
})

describe('get accurate date ranges', () => {

    test('should be inclusive of start and end date', () => {
        const startDate = new Date(2024, 0, 1)
        const endDate = new Date(2024, 0, 2)
        const dateRange = getDatesInRange(startDate, endDate)
        assert.lengthOf(dateRange, 2, "date range should have a length of 2 since the start and end date are inclusive")
        assert.includeMembers(dateRange.map((date) => date.getTime()), [startDate.getTime(), endDate.getTime()], "date range should include start and end date in array")
    })
})

describe('getting the number of days between dates', () => {
    test('should return the correct number of dates between two dates', () => {
        const startDate = new Date(2024, 0, 1)
        const endDate = new Date(2025, 0, 1)

        const expectedNumberOfDaysBetween = 366;
        const actualNumberOfDaysBetween = numberOfDaysBetween(startDate, endDate)

        assert.equal(actualNumberOfDaysBetween, expectedNumberOfDaysBetween, `Between ${startDate.toDateString()} and ${endDate.toDateString()}, it is expected to be between ${expectedNumberOfDaysBetween}`)
    })
})

