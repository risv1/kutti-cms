import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import React, { Suspense } from 'react'
import { fetchOrganizations } from '~/.server/organizations'
import { fetchPublicPosts } from '~/.server/posts'
import Loader from '~/components/Common/Loader'
import { getSession } from '~/sessions'

const DashCard = React.lazy(() => import('~/components/Dashboard/DashCard'))

type Organization = {
    id: string,
    name: string,
    owner: string,
    created_at: string
}

type Post = {
    id: string,
    email: string,
    title: string,
    description: string,
    objectURL: string,
    created_at: string
}

export async function loader({ request }: LoaderFunctionArgs) {
    const cookie = await getSession(request.headers.get("Cookie"))
    if (!cookie.has("userId")) {
        return redirect("/auth")
    }

    const userId = cookie.get("userId") as string
    const organizations = await fetchOrganizations(userId)
    if (organizations instanceof Error) return { organizations: [], posts: [], error: organizations.message }
    const posts = await fetchPublicPosts()
    if (posts instanceof Error) return { organizations: [], posts: [], error: posts.message }

    return {
        organizations,
        posts
    }
}

const PostItem: React.FC<{
    objectURL: string,
    title: string,
    description: string
}> = ({ objectURL, title, description }) => {
    return (
        <div className='w-full h-fit p-3 flex flex-col items-center'>
            <img src={objectURL} alt="post" className="w-20 h-20" />
            <p className="text-white">{title}</p>
            <p className="text-white">{description}</p>
        </div>
    )
}

const ListItem: React.FC<{
    name: string
    owner: string
}> = ({ name, owner }) => {
    return (
        <div className="w-full py-3 flex flex-row items-center justify-between bg-primary rounded-md">
            <p className="text-white font-bold">{name}</p>
            <p className="text-white"> -{">"} {owner}</p>
        </div>
    )
}

export default function DashboardIndex() {

    const loaderData = useLoaderData<typeof loader>()
    const [organizations, setOrganizations] = React.useState<Array<Organization>>([])
    const [posts, setPosts] = React.useState<Array<Post>>([])

    React.useEffect(() => {
        const listOrgs = loaderData.organizations as Array<Organization>
        const listPosts = loaderData.posts as Array<Post>
        setOrganizations(listOrgs)
        setPosts(listPosts)
    }, [loaderData])

    return (
        <Suspense fallback={<Loader />}>
            <div className="w-full h-[90%] flex flex-row mt-10 text-white gap-3">
                <div className="w-full h-full">
                    <DashCard title="Posts" icon="/logo.png">
                        <div className="w-full h-full flex flex-col gap-5">
                            {posts.length === 0 && <div className="w-full h-full flex justify-center items-center">
                                <p>No posts found</p>
                            </div>}
                            {posts.map((post, index) => (
                                <PostItem key={index} objectURL={post.objectURL} title={post.title} description={post.description} />
                            ))}
                        </div>
                    </DashCard>
                </div>
                <div className="flex flex-col w-full h-full gap-3 justify-between">
                    <div className='h-3/5'>
                        <DashCard title="Add Post" icon="/logo.png">
                            <div className="w-full flex justify-center items-center">
                                <Link to={"/dashboard/create-post"} className='w-1/2 flex justify-center items-center h-10 bg-primary rounded-md'>Create</Link>
                            </div>
                        </DashCard>
                    </div>
                    <DashCard title="Organizations" icon="/logo.png">
                        <div className="w-full h-full flex flex-col gap-5">
                            {organizations.length === 0 && <div className="w-full h-full flex justify-center items-center">
                                <p>No organizations found</p>
                            </div>}
                            {organizations.map((org, index) => (
                                <ListItem key={index} name={org.name} owner={org.owner} />
                            ))}
                        </div>
                    </DashCard>
                </div>
            </div>
        </Suspense>
    )
}