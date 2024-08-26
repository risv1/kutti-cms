import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { eq } from "drizzle-orm";
import React from "react";
import { db } from "~/.server/db";
import { users } from "~/.server/schema";
import { commitSession, expires, getSession } from "~/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    const data = new URLSearchParams({
        code: code!,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
        grant_type: "authorization_code",
    });

    try {
        const res = await fetch(process.env.GOOGLE_TOKEN_URL!, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString(),
        });

        if (!res.ok) {
            console.error(await res.text());
            return redirect("/auth");
        }

        const { access_token } = await res.json();

        const userRes = await fetch(process.env.GOOGLE_USER_INFO_URL!, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const user = await userRes.json();
        const userEmail = user.email;
        const userId = user.id;

        const [checkUserEmail] = await db.select().from(users).where(eq(users.email, userEmail))
        if (checkUserEmail) {
            session.set("userId", checkUserEmail.id);
            return redirect(`/dashboard?email=${encodeURIComponent(userEmail)}`, {
                headers: {
                    "Set-Cookie": await commitSession(session, {
                        expires: expires
                    }),
                },
            });
        }

        try {
            await db.insert(users).values({
                id: userId,
                email: userEmail,
            });

            session.set("userId", userId);
            return redirect(`/dashboard?email=${encodeURIComponent(userEmail)}`, {
                headers: {
                    "Set-Cookie": await commitSession(session, {
                        expires: expires
                    }),
                },
            });
        } catch (error) {
            console.error(error);
            return redirect("/auth");
        }

    } catch (error) {
        console.error(error);
        return redirect("/auth");
    }
}