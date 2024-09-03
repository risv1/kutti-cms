import React from "react";

type DashCardProps = {
    title: string;
    children: React.ReactNode
    icon: string;
}

const DashCard: React.FC<DashCardProps> = ({ title, children, icon }) => {
    return (
        <div className="bg-neutral-950 hover:border-primary duration-150 rounded-lg border border-neutral-900 bg-opacity-50 shadow-md p-5 w-full h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={icon} alt={title} className="w-12 h-10" />
                    <h2 className="text-2xl font-semibold ml-2">{title}</h2>
                </div>
            </div>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}

export default DashCard