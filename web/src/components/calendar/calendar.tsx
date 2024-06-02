import CalendarCell from "@/components/calendar/calendarcell";
import {getDatesInRange, getFirstDayOfWeek, getLastDayOfWeek} from "@/app/_lib/calendar";

interface CalendarProps {
    month: number
    year: number
    selectedDate: Date
    onChange: (date: Date) => void
}

export default function Calendar(props: CalendarProps) {

    function getDatesToDisplay(): Date[] {
        const startDate = new Date(props.year, props.month, 1, 0, 0, 0, 0)
        const endDate = new Date(props.year, props.month + 1, 0, 0, 0, 0, 0)

        const startDay = getFirstDayOfWeek(startDate);
        const endDay = getLastDayOfWeek(endDate);

        return getDatesInRange(startDay, endDay);
    }

    function selectDate(date: Date) {
        props.onChange(date)
    }

    function buildCalendar() {
        const dates = getDatesToDisplay();

        return dates.map((date: Date, index: number) => {
            return <CalendarCell date={date}
                                 key={index}
                                 disabled={date.getMonth() !== props.month}
                                 selected={props.selectedDate.toDateString() === date.toDateString()}
                                 onClick={selectDate}>
                    </CalendarCell>
        })
    }


    return (
        <div>
            <div className={"grid grid-cols-7 border border-black"} >
                { buildCalendar() }
            </div>
        </div>
    )
}