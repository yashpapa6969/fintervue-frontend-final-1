import { googleSignInClicked } from "@/lib/services/oauth.auth";
import { useNavigate } from "react-router-dom";

const RegisterWithGoogleButon = ({
    type,
}: {
    type: "interviewer" | "candidate";
}) => {
    const navigte = useNavigate();

    return (
        <button
            className="w-full py-2 mt-2 text-center text-white bg-blue-500 rounded-md"
            onClick={async () => {
                window.location.assign(await googleSignInClicked());
            }}
        >
            Sign up with Google
        </button>
    );
};

export default RegisterWithGoogleButon;
