import { handleGoogleCallback } from "@/lib/services/oauth.auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { loginFlow } from "@/lib/services/candidate.auth";
import { loginFlow as loginFlowInterviewer } from "@/lib/services/interviewer.auth";
import { OAUTH_PASSWORD } from "@/lib/constants";
import { useUser } from "@/context/UserProvider";
import { ArrowLeft } from "lucide-react";

const GoogleOauthCallbackPage = () => {
    const { setUser } = useUser();

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const handlingGoogleCallback = async () => {
            try {
                const { email, newUser } = await handleGoogleCallback();

                if (newUser) {
                    navigate(`/signup/choose?email=${email}`);
                } else {
                    try {
                        const candidate = await loginFlow(
                            email,
                            OAUTH_PASSWORD,
                            true
                        );

                        if (candidate) {
                            setUser({
                                type: "interviewee",
                                user: candidate,
                            });
                        } else {
                            throw new Error("might be an interviewer");
                        }
                    } catch (error) {
                        try {
                            const interviewer = await loginFlowInterviewer(
                                email,
                                OAUTH_PASSWORD,
                                true
                            );

                            if (interviewer) {
                                setUser({
                                    type: "interviewer",
                                    user: interviewer,
                                });
                            } else {
                                throw new Error(
                                    "No already existing user data. User must sign up"
                                );
                            }
                        } catch (error) {
                            throw new Error((error as any).message as string);
                        }
                    }

                    navigate("/display");
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: (error as any).message as string,
                });
            }

            setIsLoading(false);
        };

        handlingGoogleCallback();
    }, []);

    return (
        <div className="w-full h-[60vh]">
            <Navbar />

            <div className="grid w-full h-full place-content-center gap-4">
                <button
                    className="w-[200px] mx-auto py-2 mt-2 text-center text-white bg-blue-500 rounded-md disabled:bg-opacity-50"
                    disabled={isLoading}
                >
                    Signing you in...
                </button>

                <button
                    className="flex flex-row gap-2 items-center justify-center w-[200px] mx-auto py-2 mt-2 text-center bg-white text-blue-500 rounded-md disabled:bg-opacity-50"
                    disabled={isLoading}
                >
                    <ArrowLeft size={14} /> Go Back to the Sign Up Page
                </button>
            </div>
        </div>
    );
};

export default GoogleOauthCallbackPage;
