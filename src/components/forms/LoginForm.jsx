import { useToast } from "@chakra-ui/react";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [error, setError] = useState({ error: "", message: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const canRegister = !!email && !!password;


    const handleSubmit = async () => {
        try {
            // TODO: implement form submission api then check this
            navigate("/");
        } catch (error) {
            const { error: serverErrorMessage } = error.response.data;
            if (error) setError({ error: "email", message: serverErrorMessage });
            toast({
                variant: "destructive",
                title: "Error creating user",
                description: error.message,
            });
        }
    }

    return (
        <div className="flex flex-col gap-4 px-6 md:px-0 max-w-[500px]">
            <div className="flex flex-col">
                <h3 className="font-bold text-3xl text-[rgba(51,51,51,1)] mt-[24px]">Login</h3>
            </div>
            <p className="font-extralight text-md">Enter your email and password to login.</p>
            <div>
                <label htmlFor="email_input" className="text-gray-400 font-[400] text-sm leading-[24px] pb-[7px]">Your email</label>
                <input
                    className={`w-full outline-none border-[1px] border-[rgba(102,102,102,0.35)] rounded-md text-[18px] py-2 px-3 mb-[16px]`}
                    type="text"
                    id="email_input"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="passward" className="text-gray-400 font-[400] text-sm leading-[24px] pb-[7px]">Passward</label>
                <input
                    className={`w-full outline-none border-[1px] border-[rgba(102,102,102,0.35)] rounded-md text-[18px] py-2 px-3 mb-[16px]`}
                    type="password"
                    id="passward"
                    name="passward"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error.error != "" && (
                <div className="bg-red-200 border text-sm border-red-500 text-red-500 rounded-md p-2 flex items-center gap-2">
                    <CircleX color="#ff6161" /> {error.message}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0">
                <p className="text-[rgba(102,102,102,1)]">Don&apos;t have an account? <Link to="/signup" className="text-blue-400">Sign up</Link></p>

                <button
                    onClick={handleSubmit}
                    className="py-3 text-white bg-blue-500 font-bold w-full md:w-40 self-end text-lg rounded-lg disabled:opacity-[25%] disabled:bg-[rgba(17,17,17,1)]"
                    disabled={!canRegister || error.error != ""}
                >
                    Sign up
                </button>
            </div>
        </div>
    )
}

export default LoginForm