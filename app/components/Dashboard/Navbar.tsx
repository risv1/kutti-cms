import { Form, Link, useFetcher } from "@remix-run/react"
import React from "react"
import SearchPosts from "./SearchPosts"

const Profile: React.FC = () => {
    const [showProfile, setShowProfile] = React.useState(false)
    const fetcher = useFetcher()

    const toggleProfile = () => {
        setShowProfile(!showProfile)
    }

    const logout = () => {
        localStorage.removeItem("userEmail")
        fetcher.submit(null, {
            method: "POST",
            action: "/auth/logout"
        })
    }

    return (
        <>
            <img onClick={toggleProfile} src="/user.png" alt="Avatar" className="w-10 h-10 hover:cursor-pointer p-1" />
            {
                showProfile && <div className="flex flex-col gap-3 absolute top-[11.5%] right-5 px-5 py-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                    <span className="text-white text-lg font-semibold">{localStorage.getItem("userEmail")?.toString()}</span>
                    <button onClick={logout} className="text-red-700 hover:cursor-pointer text-sm font-medium">
                        Logout</button>
                </div>
            }
       </>
    )
}

const Navbar: React.FC = () => {
    return (
        <nav className="w-full bg-neutral-950 border-b border-neutral-800 bg-opacity-50 px-5 py-4 flex flex-row items-center">
            <Link to={"/"} className="text-2xl text-white font-semibold gap-1 flex flex-row items-center"><img src="/logo.png" alt="Logo" className="w-14 pb-1" />Kutti CMS</Link>
            <div className="ml-14"><SearchPosts /></div>
            <div className="ml-auto flex flex-row gap-10 items-center mr-3">
                <Link to="/dashboard" className="hover:text-white ease-out duration-150 text-gray-500 text-xl font-medium">Dashboard</Link>
                <Link to="/dashboard/organizations" className="hover:text-white ease-out duration-150 text-gray-500  text-xl font-medium">Organizations</Link>
                <Link to={"/dashboard/posts"} className="hover:text-white ease-out duration-150 text-gray-500 text-xl font-medium">Posts</Link>
                <Profile />
            </div>
        </nav>
    )
}

export default Navbar