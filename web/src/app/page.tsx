'use client'

import Calendar from "@/components/calendar/calendar";
import {useEffect, useState} from "react";
import Modal from "@/components/Modal";
import {Gratitude} from "@/app/_lib/gratitude/service";
import {redirect} from "next/navigation";
import {GratitudeService, IGratitudeService} from "@/app/_lib/gratitude/service";
import {SpringApi} from "@/app/_lib/api/api";
import {Cookies, CookiesProvider} from "react-cookie";

export default function Home() {

    const gratitudeService: IGratitudeService = new GratitudeService(new SpringApi());

    const [selectedDate, setSelectedDate] = useState<null|Date>(null)
    const [showAddGratitudeModal, setShowAddGratitudeModal] = useState<boolean>(false)

    const [gratitudes, setGratitudes] = useState<Map<string, Gratitude[]>>(new Map<string, Gratitude[]>())
    const [newGratitudeMessage, setNewGratitude] = useState<string>("")

    useEffect(() => {
        const all = new Cookies();
        const sessionId = all.get("sessionId")
        if(!sessionId) {
            redirect("/login")
        }
        setup()
    }, [])

    function setup() {
        const date = new Date();
        date.setMonth(0)
        date.setDate(1)
        changeDate(date)
    }

    function changeDate(date: Date) {
        const month = date.getMonth()
        const year = date.getFullYear()
        if (month !== selectedDate?.getMonth()) {
            updateCalendar(month, year)
        }
        setSelectedDate(date)
    }

    function updateCalendar(month: number, year: number) {
        const updatedGratitudes = new Map<string, Gratitude[]>();
        gratitudeService.getGratitudes(month, year).then((grats) => {
            grats.forEach((gratitude) => {
                const key = `${gratitude.date}-${gratitude.month}-${gratitude.year}`;
                const workingGratitudes = updatedGratitudes.get(key) ?? []
                workingGratitudes.push(gratitude);
                updatedGratitudes.set(key, workingGratitudes)
            })
            updatedGratitudes.forEach((value, key) => {
                const currentGratitudes = new Map<string, Gratitude[]>(gratitudes)
                currentGratitudes.set(key, value)
                setGratitudes(currentGratitudes)
            })
        })
    }

    async function addGratitude() {
        if (newGratitudeMessage.length === 0 || !selectedDate) {
            return
        }

        await gratitudeService.addGratitude(newGratitudeMessage, selectedDate)
        setNewGratitude("")
        setShowAddGratitudeModal(false)


        const month = selectedDate.getMonth()
        const year = selectedDate.getFullYear()
        updateCalendar(month, year)
    }

    function getCurrentGratitudes() {
        if (!selectedDate) {
            return []
        }

        const key = `${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`;
        return gratitudes.get(key) ?? []
    }

    return (
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <main className="flex min-h-screen flex-col items-center gap-9 pt-24">
                <div className={"w-6/12 sm:w-full"}>
                    <Calendar onChange={changeDate} selectedDate={selectedDate ?? new Date()}></Calendar>
                </div>
                <div className={"w-full"}>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="text-center px-6 py-3">
                                    Gratitude
                                    <button onClick={() => setShowAddGratitudeModal(true)}
                                            className={"mx-5 px-3 py-2.5 rounded bg-blue-500 text-white"}>+</button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {getCurrentGratitudes().map((gratitude: Gratitude) => {
                                return (<tr key={gratitude.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {gratitude.message}
                                    </th>
                                </tr>)
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>


                <Modal show={showAddGratitudeModal} cancel={() => setShowAddGratitudeModal(false)} id={"add-gratitude"}
                       title={"Add Gratitude"}>
                    <div className={"m-5"}>
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                            gratitude</label>
                        <textarea id="message" rows={4}
                                  value={newGratitudeMessage}
                                  onChange={(event) => setNewGratitude(event.target.value)}
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write your gratitude here..."></textarea>
                    </div>
                    <div className={"flex items-center justify-end"}>
                        <button type="button"
                                onClick={() => addGratitude()}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                        </button>
                        <button type="button"
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={() => setShowAddGratitudeModal(false)}>Cancel
                        </button>

                    </div>
                </Modal>

            </main>
        </CookiesProvider>

    );
}
