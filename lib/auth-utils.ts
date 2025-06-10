import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    return session?.user;
    }

    export async function isAdmin() {
    const user = await getCurrentUser();
    return user?.role === "admin";
    }

    export async function requireAdmin() {
    const isUserAdmin = await isAdmin();
    if (!isUserAdmin) {
        throw new Error("not admin");
    }
} 