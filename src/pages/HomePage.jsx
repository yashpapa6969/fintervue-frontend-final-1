import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <Link
                to={"/login"}
                className="py-3 flex items-center justify-center text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-lg"
            >
                Login
            </Link>
            <Link
                to={"/signup"}
                className="py-3 flex items-center justify-center text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-lg"
            >
                Join now
            </Link>
        </div>
    )
}

export default HomePage