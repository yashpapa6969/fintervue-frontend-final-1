import { useToast } from "@chakra-ui/react";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";

const SignupForm = () => {
    const toast = useToast();

    const [error, setError] = useState({ error: "", message: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");

    const canRegister = !!email && !!password && !!fullname;

    useEffect(() => {
        if (!canRegister) {
            toast({
                title: "Error",
                variant: "top-accent",
                status: "error",
                isClosable: true,
            })
        }
    }, [canRegister])

    return (
        <div className="flex flex-col gap-4 px-6 md:px-0 w-full">
            <div className="flex flex-col">
                <h3 className="font-bold text-3xl text-[rgba(51,51,51,1)] mt-[24px]">Fill in your details</h3>
            <p className="font-extralight text-md">Enter your email address to create an account.</p>
            </div>
            <div>
                <label htmlFor="fname_input" className="text-gray-400 font-[400] text-sm leading-[24px] pb-[7px]">Full name</label>
                <input
                    className={`w-full outline-none border-[1px] border-[rgba(102,102,102,0.35)] rounded-md text-[18px] py-2 px-3 mb-[16px]`}
                    type="text"
                    id="fname_input"
                    name="email"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
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
                <label htmlFor="mob_input" className="text-gray-400 font-[400] text-sm leading-[24px] pb-[7px]">Mobile number</label>
                <input
                    className={`w-full outline-none border-[1px] border-[rgba(102,102,102,0.35)] rounded-md text-[18px] py-2 px-3 mb-[16px]`}
                    type="number"
                    id="mob_input"
                    name="mobile"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {error.error != "" && (
                <div className="bg-red-200 border text-sm border-red-500 text-red-500 rounded-md p-2 flex items-center gap-2">
                    <CircleX color="#ff6161" /> {error.message}
                </div>
            )}
        </div>
    )
}

export default SignupForm