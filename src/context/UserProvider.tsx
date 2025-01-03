import { Interviewee, Interviewer, User } from "@/lib/types/auth.types";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<{
    user: User;
    setUser: (user: User) => void;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({
        type: "null",
        user: null,
    });

    const setUserWithLocalStorage = (newUser: User) => {
        localStorage.setItem("user", JSON.stringify(newUser));

        if (newUser.user) {
            const userId =
                newUser.type === "interviewee"
                    ? (newUser.user as Interviewee).interviewee_id
                    : (newUser.user as Interviewer).interviewer_id;

            localStorage.setItem("userId", userId as string);
            localStorage.setItem("userType", newUser.type);
        } else {
            localStorage.removeItem("userId");
            localStorage.removeItem("userType");
        }

        setUser(newUser);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user && JSON.parse(user).user) {
            const parsedUser = JSON.parse(user as string);
            if (parsedUser.interviewee_id) {
                setUserWithLocalStorage({
                    type: "interviewee",
                    user: parsedUser.user as Interviewee,
                });
            } else {
                setUserWithLocalStorage({
                    type: "interviewer",
                    user: parsedUser.user as Interviewer,
                });
            }
        } else {
            setUserWithLocalStorage({
                type: "null",
                user: null,
            });
        }
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUser: setUserWithLocalStorage }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const user = useContext(UserContext);

    if (user === null) {
        throw new Error(
            "user context must be used inside of the user context provider"
        );
    }

    return user;
};
