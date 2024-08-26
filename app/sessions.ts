import { createSessionStorage } from "@remix-run/node";
import { db } from "./.server/db";
import { eq } from "drizzle-orm";
import { sessions } from "./.server/schema";
import { v4 as uuid } from "uuid";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error?: string;
};

function createDatabaseSessionStorage({ cookie, host, port }: {
  cookie: any,
  host: string,
  port: number
}) {
  return createSessionStorage<SessionData, SessionFlashData>({
    cookie,
    async createData(data) {
      try {
        const [checkExisingSession] = await db.select().from(sessions).where(
          eq(sessions.user_id, data.userId!)
        );
        if (checkExisingSession) {
          return checkExisingSession.id;
        }
        const id = uuid().toString()
        await db.insert(sessions).values({
          id: id,
          user_id: data.userId!,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        });
        return id
      } catch (error) {
        console.error(error);
        return "";
      }
    },
    async readData(sessionId) {
      const [session] = await db.select().from(sessions).where(
        eq(sessions.id, sessionId)
      );
      if (!session) return null;
      return { userId: session.user_id };
    },
    async updateData(sessionId, data) {
      try {
        await db.update(sessions).set({
          user_id: data.userId,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        }).where(eq(sessions.id, sessionId));
      } catch (error) {
        console.error(error);
      }
    },
    async deleteData(sessionId) {
      try {
        await db.delete(sessions).where(eq(sessions.id, sessionId));
      } catch (error) {
        console.error(error);
      }
    }
  })
}

const { getSession, commitSession, destroySession } = createDatabaseSessionStorage({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  cookie: {
    name: "__session",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SECRET!],
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
})

const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

export { getSession, commitSession, destroySession, expires };