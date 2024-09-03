import { eq } from "drizzle-orm"
import { db } from "./db"
import { organizations, users } from "./schema"

export const fetchOrganizations = async(userId: string) => {
    try{
        const getOrganizations = await db.select({
            id: organizations.id,
            name: organizations.name,
            owner: users.email,
            created_at: organizations.created_at
        })
        .from(organizations)
        .leftJoin(users, eq(organizations.owner_id, users.id))
        .where(eq(organizations.id, userId))
        if (!getOrganizations) return Error("Failed to fetch organizations")
        if (getOrganizations.length === 0) return Error("No organizations found")

        return getOrganizations
    } catch(e){
        return Error("Failed to fetch organizations")
    }
}