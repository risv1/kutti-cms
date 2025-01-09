import { eq, or } from "drizzle-orm"
import { db } from "./db"
import { organization_admins, organization_members, organizations, users } from "./schema"
import { Organization } from "~/models/organizations"

export const fetchOrganizations = async (userId: string) => {
    try {
        const getOrganizations = await db.select({
            id: organizations.id,
            name: organizations.name,
            owner: users.email, 
            created_at: organizations.created_at
        })
            .from(organizations)
            .leftJoin(users, eq(organizations.owner_id, users.id))
            .leftJoin(organization_admins, eq(organization_admins.organization_id, organizations.id))
            .leftJoin(organization_members, eq(organization_members.organization_id, organizations.id))
            .where(
                or(
                    eq(organization_members.user_id, userId),
                    eq(organization_admins.user_id, userId),
                    eq(organizations.owner_id, userId)
                )
            )
        if (!getOrganizations) return Error("Failed to fetch organizations")
        if (getOrganizations.length === 0) return Error("No organizations found")
        return getOrganizations
    } catch (e) {
        return Error("Failed to fetch organizations")
    }
}