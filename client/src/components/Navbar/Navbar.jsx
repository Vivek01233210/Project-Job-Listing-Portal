import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="bg-gray-100 fixed top-0 left-0 right-0 p-4 z-20 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link className="text-xl font-bold text-gray-800" to="/">Job Portal App</Link>
                    <button className="text-gray-800 md:hidden" type="button" aria-label="Toggle navigation">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <ul className="flex flex-col md:flex-row md:space-x-4">
                            <li className="nav-item">
                                <Link className="text-gray-800 hover:text-gray-600" aria-current="page" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="text-gray-800 hover:text-gray-600" aria-current="page" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="mt-16">
            </div>
        </>
    )
}