import {
    handleGoogleCallback,
    googleSignInClicked,
} from "@/lib/services/oauth.auth";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Navbar from "@/components/navbar";

const GoogleOauthCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

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
                } = await handleGoogleCallback(type || "candidate");

                console.log(email, newUser, userType);

                if (newUser) {
                    navigate(`/signup/${userType}?email=${email}`);
                } else {
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
                    className="w-[200px] mx-auto py-2 mt-2 text-center text-white bg-blue-500 rounded-md"
                    disabled={isLoading || true}
                >
                    Signing you in...
                </button>
            </div>
        </div>
    );
};

export default GoogleOauthCallbackPage;
