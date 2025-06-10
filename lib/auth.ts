import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Client } from "@notionhq/client";
import bcrypt from "bcryptjs";
import { getMessage } from "@/app/utils/messages";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_USER_DATABASE_ID;

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error(getMessage('validation.emailPassword.required'));
                }

                try {
                    const response = await notion.databases.query({
                        database_id: DATABASE_ID!,
                        filter: {
                            property: "email",
                            rich_text: {
                                equals: credentials.email,
                            },
                        },
                    });

                    if (response.results.length === 0) {
                        throw new Error(getMessage('validation.notAuthorized'));
                    }

                    const user = response.results[0] as any;
                    const hashedPassword = user.properties.password.rich_text[0]?.plain_text || "";
                    const role = user.properties.role?.rich_text[0]?.plain_text || "user";

                    const isPasswordValid = await bcrypt.compare(credentials.password, hashedPassword);

                    if (!isPasswordValid) {
                        throw new Error(getMessage('validation.notAuthorized'));
                    }
                    console.log(user);
                    return {
                        id: user.id,
                        email: user.properties.email?.email || "",
                        role: role,
                        name: user.properties.name?.title?.[0]?.plain_text || "",
                    };
                } catch (error) {
                    console.error(getMessage('validation.loginError'), error);
                    throw error;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}; 