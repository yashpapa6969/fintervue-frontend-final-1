import { googleSignInClicked } from "@/lib/services/oauth.auth";

const RegisterWithGoogleButon = () => {
    return (
        <button
            className="flex flex-row gap-2 justify-center items-center w-full tracking-wide font-semibold py-2 mt-2 text-center text-white bg-blue-500 rounded-md"
            onClick={async () => {
                window.location.assign(await googleSignInClicked());
            }}
        >
            <img
                src="google-logo.svg"
                alt="google-logo"
                className="bg-white rounded-full"
                width={32}
                height={32}
            />
            Join us using Google
        </button>
    );
};

export default RegisterWithGoogleButon;
