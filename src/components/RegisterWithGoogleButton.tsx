import { googleSignInClicked } from "@/lib/services/oauth.auth";

const RegisterWithGoogleButon = ({
    type,
}: {
    type: "interviewer" | "candidate";
}) => {
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
