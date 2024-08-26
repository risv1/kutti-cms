import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect, json, createCookie } from "@remix-run/node";
import { loginUser } from "~/.server/auth";
import { commitSession, expires, getSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return redirect("/dashboard");
  } else {
    const body = await request.formData();
    const email = body.get("email") as string;
    const password = body.get("password") as string;

    try {
      const userId = (await loginUser(email, password)) as string;
      if (userId === null) {
        session.flash("error", "Invalid email or password");
        
        const sessionCookieHeader = await commitSession(session, {
          expires: expires
        });
        
        return redirect("/auth", {
          headers: {
            "Set-Cookie": sessionCookieHeader
          },
        });
      }

      session.set("userId", userId);
      const sessionCookieHeader = await commitSession(session, {
        expires: expires
      });

      return redirect(`/dashboard?email=${email}`, {
        headers: {
          "Set-Cookie": sessionCookieHeader
        },
      });
    } catch (error) {
      return json({ errors: error }, { status: 401 });
    }
  }
}
