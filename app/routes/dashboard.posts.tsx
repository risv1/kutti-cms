import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Suspense } from "react";
import { getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session.has("userId")) {
        return redirect("/auth");
    }

    const searchQuery = new URL(request.url).searchParams.get("search")
    if (searchQuery) {
        return json({ message: `Searching for posts with query: ${searchQuery}` });
    }

    return json({ message: "Welcome to the posts dashboard" });
}

export default function DashboardPosts() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <h1 className="text-3xl font-semibold text-primary">Posts</h1>
        </Suspense>
    )
}