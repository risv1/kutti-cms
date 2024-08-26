import { LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { Suspense } from "react";
import { getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
    const checkSession = await getSession(request.headers.get("Cookie"));
    if (!checkSession.has("userId")) {
        return redirect("/auth");
    }

    return json({ message: "Welcome to the organizations dashboard" });
}

export default function DashboardOrganizations() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <h1 className="text-3xl font-semibold text-primary">Organizations</h1>
        </Suspense>
    )
}
