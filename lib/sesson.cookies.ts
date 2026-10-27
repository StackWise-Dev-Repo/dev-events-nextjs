"use server";

import { cookies } from "next/headers";


export async function authenticateUserSession() {
    const storeCookies = await cookies();
    const sessionCookies = storeCookies.get("user_session")?.value;
    if(sessionCookies !== undefined) {
        return JSON.parse(sessionCookies);
    }
    return {session: false, name: "", email: ""}
}

export async function cleanUserSession() {
  (await cookies()).delete("user_session");
  return {
    success: true,
    message: "Session removed successfully.",
  };
}



