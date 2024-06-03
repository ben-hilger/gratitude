'use client'

import {Suspense, useState} from "react";
import {UserService} from "@/app/_lib/user/user";
import {SpringApi} from "@/app/_lib/api/api";
import {SessionService} from "@/app/_lib/session/service";
import {useSearchParams} from "next/navigation";
import {Cookies, useCookies} from "react-cookie";

export default function Page() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const userService = new UserService(new SpringApi());

    function AccountCreated() {
        const params = useSearchParams();
        const cameFromCreateAccount = params.get("prev") === "create"
        if (cameFromCreateAccount) {
            return (<div className={"text-green-700 mb-3"}>Your account has been created! Please login below to
                continue</div>)
        }
        return <></>
    }


    async function login() {
        if (email.length === 0 || password.length === 0) {
            return
        }
        setErrorMessage("")
        const result = await userService.loginUser(email, password)
        switch (result) {
            case 400:
                setErrorMessage("Please check the the email and password, and try again")
                return
            case 500:
                setErrorMessage("There was an issue logging you in, please try again later")
                return
            default:
                const all = new Cookies();
                all.set("sessionId", result as string)
                window.open("/", "_self")
                return
        }
    }

    return (
            <div className={"w-screen h-screen flex items-center justify-center"}>
                <div className={"border border-black rounded w-6/12 bg-white p-5"}>
                    <div className={"text-3xl font-bold w-full text-center pb-2"}>
                        <span>Login</span>
                    </div>
                    <Suspense>
                        <AccountCreated></AccountCreated>
                    </Suspense>

                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" id="email"
                               value={email}
                               onChange={(event) => setEmail(event.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="email@example.com"/>
                    </div>
                    <div className={"pt-5"}>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password"
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder=""/>
                    </div>
                    {
                        errorMessage.length > 0 ? <div className={"text-red-500 pb-2"}>{errorMessage}</div> : <></>
                    }
                    <div className={"flex flex-col mt-3"}>
                        <button type="button"
                                onClick={login}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login
                        </button>
                        <button type="button"
                                onClick={() => window.open("/account/create", "_self")}
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create
                            Account
                        </button>
                    </div>
                </div>
            </div>
    );
}