import CalendarCell from "@/components/calendar/calendarcell";
import {getDatesInRange, getFirstDayOfWeek, getLastDayOfWeek} from "@/app/_lib/calendar";
import {incrementMonth} from "@/app/_lib/date";

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

    function goToNextMonth() {
        const newDate = incrementMonth(props.selectedDate, 1)
        selectDate(newDate)
    }

    function goToPrevMonth() {
        const newDate = incrementMonth(props.selectedDate, -1)
        selectDate(newDate)
    }

    function currentMonth() {
        return Intl.DateTimeFormat(undefined, {
            month: 'long',
            year: 'numeric'
        }).format(props.selectedDate)
    }

        return (
        <div>
            <div className={"text-3xl flex items-center justify-center gap-3 font-bold mb-5"}>
                <kbd
                    onClick={goToPrevMonth}
                    className="cursor-pointer rtl:rotate-180 inline-flex items-center px-2 py-2 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor"
                         viewBox="0 0 10 16">
                        <path
                            d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z"/>
                    </svg>
                    <span className="sr-only">Arrow key left</span>
                </kbd>
                {currentMonth()}
                <kbd
                    onClick={goToNextMonth}
                    className="cursor-pointer rtl:rotate-180 inline-flex items-center px-2 py-2 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                    <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor"
                         viewBox="0 0 10 16">
                        <path
                            d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"/>
                    </svg>
                    <span className="sr-only">Arrow key right</span>
                </kbd>
            </div>
            <div className={"grid grid-cols-7"}>
                {buildCalendar()}
            </div>
        </div>
    )
}