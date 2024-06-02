import CalendarCell from "@/components/calendar/calendarcell";
import {getDatesInRange, getFirstDayOfWeek, getLastDayOfWeek} from "@/app/_lib/calendar";

interface CalendarProps {
    selectedDate: Date
    onChange: (date: Date) => void
}

export default function Calendar(props: CalendarProps) {

    function getDatesToDisplay(): Date[] {
        const startDate = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth(), 1, 0, 0, 0, 0)
        const endDate = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth() + 1, 0, 0, 0, 0, 0)

        const startDay = getFirstDayOfWeek(startDate);
        const endDay = getLastDayOfWeek(endDate);

        return getDatesInRange(startDay, endDay);
    }

    function selectDate(date: Date) {
        props.onChange(date)
    }

    function buildCalendar() {
        const dates = getDatesToDisplay();

        return dates.map((date: Date) => {
            return <CalendarCell date={date}
                                 key={date.toDateString()}
                                 disabled={date.getMonth() !== props.selectedDate.getMonth()}
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