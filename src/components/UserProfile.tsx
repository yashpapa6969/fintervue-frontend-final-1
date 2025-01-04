import { useUser } from "@/context/UserProvider";
import * as Popover from "@radix-ui/react-popover";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/lib/services/candidate.auth";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

const UserProfile = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const [logoutLoading, setLogoutLoading] = useState(false);

    return (
        <div className="items-center inline-block w-10 h-10 mx-2 align-middle bg-black rounded-full">
            <Popover.Root>
                <Popover.Trigger>
                    <img
                        src={user?.user?.profilePic || "/User-icon.jpg"}
                        alt="user profile photo"
                    />
                </Popover.Trigger>
                <Popover.Anchor />
                <Popover.Portal>
                    <Popover.Content className="flex z-[100] flex-col gap-2 p-2 bg-gray-200 rounded-md">
                        <NavLink to="/user-profile">
                            <button className="flex flex-row items-center justify-center w-full gap-2 px-4 py-2 mr-2 text-sm font-medium text-center text-black bg-gray-300 rounded-md">
                                Profile <User size={14} />
                            </button>
                        </NavLink>
                        <button
                            className="flex flex-row items-center justify-center w-full gap-2 px-4 py-2 mr-2 text-sm font-medium text-center text-white bg-gray-800 rounded-md disabled:bg-opacity-50"
                            onClick={async () => {
                                setLogoutLoading(true);

                                await logout();
                                setUser({
                                    type: "null",
                                    user: null,
                                });

                                localStorage.removeItem("userId");

                                setLogoutLoading(false);
                                navigate("/signup");
                            }}
                            disabled={logoutLoading}
                        >
                            Logout <LogOut size={14} />
                        </button>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
};

export default UserProfile;
