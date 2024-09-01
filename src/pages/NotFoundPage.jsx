import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-semibold text-blue-700">404</h1>
            <p className="text-lg">Sorry, we couldn&apos;t find what you&apos;re loooking for</p>
            <Link to="/" className="bg-blue-500 px-4 py-2 rounded-md font-semibold text-white mt-6">Go back home</Link>
        </div>
    );
}