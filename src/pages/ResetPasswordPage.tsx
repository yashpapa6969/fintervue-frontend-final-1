import { newPasswordEntered } from "@/lib/services/forgotpw.auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");

    return (
        <div className="w-full h-[100vh] grid place-content-center">
            <form className="w-[300px] flex flex-col gap-3 border-black border-2 p-5" onSubmit={async (e) => {
                e.preventDefault();

                if(pass === confPass) {
                    const isUpdated = await newPasswordEntered(pass);

                    if(isUpdated) {
                        navigate("/signup")
                    }
                } else {
                    window.alert("Passwords dont match!")
                }
                
            }}>
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
                <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-full">
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
