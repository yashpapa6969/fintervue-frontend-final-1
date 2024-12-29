import { useUser } from "@/context/UserProvider";
import * as Popover from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/services/candidate.auth";
import { LogOut } from "lucide-react";

const UserProfile = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

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
                    <Popover.Content className="p-2 bg-gray-200 rounded-md">
                        <button
                            className="flex flex-row items-center justify-center w-full gap-2 px-4 py-2 mr-2 text-sm font-medium text-center text-white bg-gray-800 rounded-md"
                            onClick={async () => {
                                await logout();
                                setUser(null);
                                localStorage.removeItem("user");
                                navigate("/signup");
                            }}
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
