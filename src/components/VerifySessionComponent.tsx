import React, { useEffect } from "react";
import { VERIFY_SESSION_INTERVAL } from "@/lib/constants";
import Session from "supertokens-web-js/recipe/session";
import { useUser } from "@/context/UserProvider";

const VerifySessionComponent = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { user, setUser } = useUser();;

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!Session.doesSessionExist()) {
                if (user !== null) {
                    setUser(null);
                }
            }
        }, VERIFY_SESSION_INTERVAL);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return children;
};

export default VerifySessionComponent;
