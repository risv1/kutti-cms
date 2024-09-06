import React from "react";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchOrganizations } from "~/.server/organizations";
import { createPost } from "~/.server/posts";
import CreatePost from "~/components/Dashboard/CreatePost";
import { getSession } from "~/sessions"

type Organization = {
    id: string,
    name: string,
    owner: string,
    created_at: string
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session || !session.has("userId")) {
        return redirect("/auth")
    }
    const userId = session.get("userId")

    try {
        const getMyOrgs = await fetchOrganizations(userId!)
        if (getMyOrgs instanceof Error) return json({ error: getMyOrgs.message, organizations: [] });
        return json({ message: "Fetched organizations successfully", organizations: getMyOrgs })

    } catch (error) {
        return json({ error: "Failed to fetch organizations", organizations: [] })
    }
}

export async function action({ request }: ActionFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    if (!session || !session.has("userId")) {
        return redirect("/auth")
    }
    const userId = session.get("userId")
    const formData = await request.formData();
    try {
        const newPost = await createPost(formData, userId!)
        if (newPost instanceof Error) return json({ error: newPost.message })
        return json({ message: "Created new post successfully" }, { status: 201 })
    } catch (error) {
        return json({ message: "Failed to upload file" }, { status: 400 })
    }
}

export default function DashboardCreatePost() {

    const loaderData = useLoaderData<typeof loader>()
    const [organizations, setOrganizations] = React.useState<Array<Organization> | []>([])
    React.useEffect(() => {
        if (loaderData) {
            const orgs = loaderData.organizations as Array<Organization>
            setOrganizations(orgs)
        }
    }, [loaderData])

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">Create Post</h1>
            <CreatePost organizations={organizations} />
        </div>
    )
}