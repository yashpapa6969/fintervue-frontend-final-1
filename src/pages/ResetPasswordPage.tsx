import { newPasswordEntered } from "@/lib/services/forgotpw.auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const [type, setType] = useState("");

    return (
        <div className="w-full h-[100vh] grid place-content-center">
            <form
                className="w-[400px] flex flex-col gap-3 border-black border-2 p-5"
                onSubmit={async (e) => {
                    e.preventDefault();

                    if (pass === confPass) {
                        const isUpdated = await newPasswordEntered(email, pass, type);

                        if (isUpdated) {
                            navigate("/signup");
                        }
                    } else {
                        window.alert("Passwords don't match!");
                    }
                }}
            >
                <h1 className="text-2xl font-bold">Enter your email again:</h1>
                <input
                    className="w-full p-2 border-2 border-black rounded-md"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h1 className="text-2xl font-bold">Enter your new password:</h1>
                <input
                    className="w-full p-2 border-2 border-black rounded-md"
                    type="text"
                    name="pass"
                    placeholder="New Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <input
                    className="w-full p-2 border-2 border-black rounded-md"
                    type="text"
                    name="confPass"
                    placeholder="Confirm New Password"
                    value={confPass}
                    onChange={(e) => setConfPass(e.target.value)}
                />
                <p className="mt-2">What type of user are you?</p>
                <div className="flex gap-6">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="notice_period"
                            value="candidate"
                            onChange={(e) => setType("interviewee")}
                            className="cursor-pointer"
                        />
                        <span className="ml-2">Candidate</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="notice_period"
                            value="interviewer"
                            onChange={(e) => setType("interviewer")}
                            className="cursor-pointer"
                        />
                        <span className="ml-2">Interviewer</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-blue-500 rounded-full"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
