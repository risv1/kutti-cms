import React from "react"

type ErrorProps = {
    text: string
    status: number
    data: string
}

const Error: React.FC<ErrorProps> = ({
    text,
    status,
    data
}) => {
    return (
        <div className="w-full h-full flex flex-col gap-5 text-white justify-center items-center">
            <img src="/logo.png" alt="Logo" className="w-40" />
            <h1 className="text-6xl font-extrabold">{text}<span className="text-primary text-7xl">.</span></h1>
            <p className="text-2xl"><span className="text-primary font-bold">{status}</span> {data}</p>
        </div>
    )
}

export default Error