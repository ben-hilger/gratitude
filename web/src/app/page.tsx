'use client'

import Calendar from "@/components/calendar/calendar";
import {useState} from "react";
import {changeMonth} from "@/app/_lib/date";

export default function Home() {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 0, 1, 0, 0, 0, 0))

    function nextMonth() {
        const newDate = changeMonth(selectedDate, 1)
        setSelectedDate(newDate)
    }

    function prevMonth() {
        const newDate = changeMonth(selectedDate, -1)
        setSelectedDate(newDate)
    }

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Calendar onChange={setSelectedDate} selectedDate={selectedDate} month={0} year={2024}></Calendar>
    </main>
  );
}
