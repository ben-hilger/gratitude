'use client'

import {createRef, useState} from "react";
import {UserService} from "@/app/_lib/user/user";
import {SpringApi} from "@/app/_lib/api/api";
import {SessionService} from "@/app/_lib/session/service";

export default function Page() {

    const [name, setName] =  useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordVerify, setPasswordVerify] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const userService = new UserService(new SpringApi(), new SessionService());

    async function createAccount() {
        if (name == "" || email == "" || password == "" || passwordVerify !== password || !passwordSatisfiesRequirements()) {
            return;
        }
        const result = await userService.createUser(email, name, password)
        switch (result) {
            case 200:
                window.open("/login?prev=create", "_self")
                return
            case 209:
                setErrorMessage("A user with that email already exists")
                return
            case 400:
                setErrorMessage("Please make sure all of the information is correct, and try again")
                return
            case 500:
                setErrorMessage("There was an issue, please try again later")
                return
        }
    }

   function passwordSatisfiesRequirements() {
        const includesSpecialCharacters = password.includes("&") || password.includes("!") || password.includes("@");
        return password.length >= 8 && includesSpecialCharacters;
    }

    function arePasswordsDifferent() {
        return password !== "" && passwordVerify !== password
    }

    return (
        <div className={"w-screen h-screen flex items-center justify-center"}>
            <div className={"border border-black rounded w-6/12 bg-white p-5"}>
                <div className={"text-3xl font-bold w-full text-center pb-2"}>
                    <span>Create Account</span>
                </div>
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
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="email"
                           value={name}
                           onChange={(event) => setName(event.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Name"/>
                </div>
                <div className={"pt-5"}>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password"
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}
                           className={`bg-gray-50 border ${arePasswordsDifferent() ? "border-red-300" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                           placeholder=""/>
                </div>
                <div className={"pt-5"}>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verify
                        Password</label>
                    <input type="password" id="password"
                           value={passwordVerify}
                           onChange={(event) => setPasswordVerify(event.target.value)}
                           className={`bg-gray-50 border ${arePasswordsDifferent() ? "border-red-300" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                           placeholder=""/>
                </div>
                <div className={"pt-3"}>
                    <div className={"font-bold"}>Password must be:</div>
                    <ul>
                        <li>At least 8 characters long</li>
                        <li>Contain one of the following special characters: &!@</li>
                    </ul>
                </div>

                {
                    errorMessage.length > 0 ? <div className={"text-red-500 pb-2"}>{errorMessage}</div> : <></>
                }
                <div className={"flex mt-3 flex-col"}>
                    <button type="button"
                            onClick={createAccount}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create
                        Account
                    </button>
                    <button type="button"
                            onClick={() => window.open("/login", "_self")}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}