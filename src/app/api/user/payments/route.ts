import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const stripe = getStripe();
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    
    console.log({token})
    if(!token || !token.email) {
        return NextResponse.json({error: 'Você precisa estar logado para comprar'}, {status: 401})
    }

    const paymentIntents = await stripe.paymentIntents.list();
    
    console.log({paymentIntents})

    if(!paymentIntents || paymentIntents.data.length === 0) {
        return NextResponse.json({error: 'Você precisa estar logado para comprar'}, {status: 401})
    }

    return NextResponse.json(paymentIntents.data);
}