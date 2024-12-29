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
        localStorage.setItem("user", JSON.stringify(newUser.user));
        setUser(newUser);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.interviewee_id) {
                setUser({
                    type: "interviewee",
                    user: parsedUser as Interviewee,
                });
            } else {
                setUser({
                    type: "interviewer",
                    user: parsedUser as Interviewer,
                });
            }
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
