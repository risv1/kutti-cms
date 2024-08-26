import { redirect } from "@remix-run/node";

export async function action(){
    return redirect("/auth", {
        headers: {
            "Clear-Site-Data": "\"cookies\""
        }
    })
}