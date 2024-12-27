import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const ChoseSignUpPage = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    return (
        <div className="w-full h-[100vh] grid place-content-center">
            <div className="flex flex-col gap-5 p-5 border-2 border-black max-w-[400px]">
                <h1 className="text-3xl font-bold">
                    Choose how you would like to sign up:
                </h1>
                <NavLink
                    to={`/signup/candidate?email=${email}`}
                    className="p-3 text-center text-blue-600 underline border-2 border-blue-600"
                >
                    Login as a candidate or interviewee
                </NavLink>
                <NavLink
                    to={`/signup/interviewer?email=${email}`}
                    className="p-3 text-center text-yellow-500 underline border-2 border-yellow-500"
                >
                    Login as an interviewer
                </NavLink>
            </div>
        </div>
    );
};

export default ChoseSignUpPage;
