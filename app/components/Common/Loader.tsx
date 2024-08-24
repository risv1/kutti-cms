import React from "react"

const Loader: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-40 animate-spin duration-150" />
            <h1 className="text-3xl text-white font-semibold">Loading<span className="text-primary">...</span></h1>
        </div>
    )
}

export default Loader