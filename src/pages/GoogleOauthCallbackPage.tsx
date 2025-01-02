import { handleGoogleCallback } from "@/lib/services/oauth.auth";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { loginFlow } from "@/lib/services/candidate.auth";
import { loginFlow as loginFlowInterviewer } from "@/lib/services/interviewer.auth";
import { OAUTH_PASSWORD } from "@/lib/constants";
import { useUser } from "@/context/UserProvider";

const GoogleOauthCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    const { setUser } = useUser();

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const handlingGoogleCallback = async () => {
            try {
                const {
                    email,
                    newUser,
                    type: userType,
                } = await handleGoogleCallback(type as string);

                console.log(email, newUser, userType);

                if (newUser) {
                    navigate(`/signup/choose?email=${email}`);
                } else {
                    if (type === "candidate") {
                        const candidate = await loginFlow(
                            email,
                            OAUTH_PASSWORD,
                            true
                        );
                        setUser({
                            type: "interviewee",
                            user: candidate,
                        });
                    } else if (type === "interviewer") {
                        const interviewer = await loginFlowInterviewer(
                            email,
                            OAUTH_PASSWORD,
                            true
                        );
                        setUser({
                            type: "interviewer",
                            user: interviewer,
                        });
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

            <div className="grid w-full h-full place-content-center">
                <button
                    className="w-[200px] mx-auto py-2 mt-2 text-center text-white bg-blue-500 rounded-md disabled:bg-opacity-50"
                    disabled={isLoading}
                >
                    Signing you in...
                </button>
            </div>
        </div>
    );
};

export default GoogleOauthCallbackPage;
