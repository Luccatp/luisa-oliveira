import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || clientId.length === 0) {
        throw new Error("Missing Google Id");
    } 

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error("Missing Google Secret");
    }

    return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                return token;
            }

            return {
                id: token.id,
                name: token.name,
                email: token.email,
                image: token.picture
            }
        },

        async session({session, token}) {
            if(token) {
              session.user = token;
            }

            return session;
        },

        redirect() {
            return '/';
        }
    }
}