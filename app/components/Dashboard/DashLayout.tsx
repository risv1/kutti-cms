import React from "react";
import Navbar from "./Navbar";
import Footer from "../Common/Footer";

type LayoutProps = {
    children: React.ReactNode;
};

const DashLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className="page-entry w-screen flex flex-col h-screen bg-inherit overflow-y-scroll">
            <Navbar />
            <div className="p-5 w-full h-full">
                {children}
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}

export default DashLayout;