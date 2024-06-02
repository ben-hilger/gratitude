import {describe, it, assert} from "vitest";
import {incrementMonth} from "@/app/_lib/date";

describe("changing months", () => {

    it('should adjust month and keep date', () => {
        const date = new Date(2024, 0, 10)

        const expectedDate = new Date(2024, 1, 10)

        const actualDate = incrementMonth(date, 1)

        assert.equal(actualDate.toDateString(), expectedDate.toDateString(), `The date ${date.toDateString()}, should increment one month and preserve the date`)
    });

    it('should adjust month and date', () => {
        const date = new Date(2024, 0, 31)

        const expectedDate = new Date(2024, 1, 29)

        const actualDate = incrementMonth(date, 1)

        assert.equal(actualDate.toDateString(), expectedDate.toDateString(), `The date ${date.toDateString()}, should increment one month and set the date to the highest number in the month`)
    });

})