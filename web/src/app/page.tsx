'use client'

import Calendar from "@/components/calendar/calendar";
import {useState} from "react";
import {incrementMonth} from "@/app/_lib/date";

export default function Home() {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 0, 1, 0, 0, 0, 0))

    function goToNextMonth() {
        const newDate = incrementMonth(selectedDate, 1)
        setSelectedDate(newDate)
    }

    function goToPrevMonth() {
        const newDate = incrementMonth(selectedDate, -1)
        setSelectedDate(newDate)
    }

    function currentMonth() {
        return Intl.DateTimeFormat(undefined, {
            month: 'long',
            year: 'numeric'
        }).format(selectedDate)
    }

    return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <div className={"text-3xl flex items-center justify-center gap-3 font-bold mb-5"}>
            <kbd
                onClick={goToPrevMonth}
                className="cursor-pointer rtl:rotate-180 inline-flex items-center px-2 py-2 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
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
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 10 16">
                    <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"/>
                </svg>
                <span className="sr-only">Arrow key right</span>
            </kbd>

        </div>
        <Calendar onChange={setSelectedDate} selectedDate={selectedDate}></Calendar>
    </main>
    );
}
