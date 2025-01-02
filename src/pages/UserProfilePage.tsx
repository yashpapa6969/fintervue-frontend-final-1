import Navbar from "@/components/navbar";
import { useUser } from "@/context/UserProvider";
import { ExternalLink } from "lucide-react";

const UserProfilePage = () => {
    const { user } = useUser();

    return (
        <section id="user-profile">
            <Navbar />

            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-[750px] w-full">
                    <div className="flex flex-col items-center">
                        <img
                            src={user?.user?.profilePic || "/User-icon.jpg"}
                            alt="Profile photo"
                            className="w-24 h-24 mb-4 border-2 border-blue-500 rounded-full"
                        />

                        <h1 className="mb-2 text-2xl font-bold text-gray-800">
                            {user?.user?.firstName} {user?.user?.lastName}
                        </h1>

                        <p className="mb-4 text-sm text-gray-600">
                            {user?.user?.email}
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <a
                            href={user?.user?.linkedInProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row items-center gap-2 mx-auto text-sm text-blue-600 underline w-fit hover:text-blue-800"
                        >
                            View LinkedIn Profile <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfilePage;
