import { eq } from "drizzle-orm"
import { db } from "./db"
import { posts, users } from "./schema"
import { putIntoS3 } from "./aws"
import { v4 as uuidv4 } from "uuid"

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

export const createPost = async(formData: FormData, userId: string) =>{
    const file = formData.get("file") as File
    let fileName = `${userId}-${file.name}`
    const fileBuffer = await file.arrayBuffer()
    const content = Buffer.from(fileBuffer).toString("base64")
    if (file){
        try{
            const id = uuidv4().toString()
            const organizationId = formData.get("org") ? formData.get("org") : null
            if(organizationId) {
                fileName = `${organizationId}/${userId}-${file.name}`
            }
            const upload = await putIntoS3(fileName, content)
            if (upload instanceof Error) return Error("Failed to upload file")
            const newPost = await db.insert(posts).values({
                id: id,
                user_id: userId,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                objectURL: fileName,
                public: formData.get("public") === "on" ? true : false,
                organization_id: formData.get("org") as string
            })
            if (!newPost) return Error("Failed to create post")
            return "Post created successfully"
        } catch(e){
            return Error("Failed to create post")
        }
    } else {
        return Error("No file found")
    }
}