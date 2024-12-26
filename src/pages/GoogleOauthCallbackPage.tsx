import {
    handleGoogleCallback,
    googleSignInClicked,
} from "@/lib/services/oauth.auth";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Navbar from "@/components/navbar";

const GoogleOauthCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    return (
        <div className="w-full h-[60vh]">
            <Navbar />

            <div className="grid w-full h-full place-content-center">
                <button
                    className="w-[200px] mx-auto py-2 mt-2 text-center text-white bg-blue-500 rounded-md"
                    onClick={async () => {
                        setIsLoading(true);
                        const url = await googleSignInClicked();
                        // add interviewer / interviewee
                        // setUser into local storage
                        window.location.assign(url);

                        try {
                            const { email } = await handleGoogleCallback();
                            navigate(`/signup/${type}?email=${email}`);
                        } catch (error) {
                            toast({
                                variant: "destructive",
                                title: (error as any).message as string,
                            });
                        }

                        setIsLoading(false);
                    }}
                    disabled={isLoading}
                >
                    Sign up with Google
                </button>
            </div>
        </div>
    );
};

export default GoogleOauthCallbackPage;
