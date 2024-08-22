import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { registerUser } from "~/.server/auth";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get("email")?.toString();
  const password = body.get("password")?.toString();

  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    await registerUser(email, password);
    return json({ status: 201 })
  } catch (error) {
    return json({ error: error }, { status: 400 });
  }
}
