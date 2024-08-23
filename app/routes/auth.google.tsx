import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { getSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
    const state = "state-" + Math.random().toString(36).substring(7);
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ].join(" ");
    const googleConsentScreenUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleConsentScreenUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
    googleConsentScreenUrl.searchParams.set("redirect_uri", process.env.GOOGLE_CALLBACK_URL!);
    googleConsentScreenUrl.searchParams.set("response_type", "code");
    googleConsentScreenUrl.searchParams.set("scope", scopes);
    googleConsentScreenUrl.searchParams.set("state", state);

    const session = await getSession(request.headers.get("Cookie"));
    return redirect(googleConsentScreenUrl.toString());
}
