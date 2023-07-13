import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import getStripe from "./loading-stripe";

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
            
            
            const stripe = getStripe();
            const customer = await stripe.customers.list({
                email: token.email || user.email || '',
                limit: 1,
            });
            
            if(user) {
                token.id = user.id;
                return token;
            }
            
            if(customer.data.length === 0) {
                return {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                    stripeId: null
                }
            }
            token.stripeId = customer.data[0].id as string;
            

            return {
                id: token.id,
                name: token.name,
                email: token.email,
                image: token.picture,
                stripeId: token.stripeId
            }
        },

        async session({session, token}) {
            return session;
        },

        redirect() {
            return '/';
        }
    }
}