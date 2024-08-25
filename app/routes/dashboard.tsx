import { LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import React from "react";
import { Suspense } from "react";
import Loader from "~/components/Common/Loader";
import { getSession } from "~/sessions";

const DashLayout = React.lazy(() => import("~/components/Dashboard/DashLayout"));

export async function loader({ request }: LoaderFunctionArgs) {
    const checkSession = await getSession(request.headers.get("Cookie"));
    if (!checkSession.has("userId")) {
        return redirect("/auth");
    }

    return json({ message: "Welcome to the dashboard" });
}

export default function Dashboard() {
    return (
        <Suspense fallback={<Loader />}>
            <DashLayout>
                <h1 className="text-3xl font-semibold text-primary">Dashboard</h1>
                <Outlet />
            </DashLayout>
        </Suspense>
    )
}
