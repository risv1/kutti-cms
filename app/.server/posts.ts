import { eq } from "drizzle-orm"
import { db } from "./db"
import { posts, users } from "./schema"

export const fetchPublicPosts = async() => {
    try{
        const fetchPosts = await db.select({
            id: posts.id,
            email: users.email,
            title: posts.title,
            description: posts.description,
            objectURL: posts.objectURL,
            created_at: posts.created_at
        })
        .from(posts)
        .leftJoin(users, eq(posts.user_id, users.id))
        .where(eq(posts.public, true))
        if (!fetchPosts) return Error("Failed to fetch posts")
        if (fetchPosts.length === 0) return Error("No posts found")
        return fetchPosts
    } catch(e){
        return Error("Failed to fetch posts")
    }
}