import { prisma } from "@/lib/prisma";
import getStripe from "@/lib/loading-stripe";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getInvoiceItemsSchema } from "@/lib/validations/stripe";

export async function GET(req: NextRequest) {
    const stripe = getStripe();
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    
    if(!token || !token.email) {
        return NextResponse.json({error: 'Você precisa estar logado para comprar'}, {status: 401})
    }


    const invoiceItems = await stripe.invoiceItems.list({
        customer: token.stripeId as string,
        expand: ['data.price.product'],
    });
    

    if(!invoiceItems || invoiceItems.data.length === 0) {
        return NextResponse.json({error: 'Você não tem nenhuma compra'}, {status: 404})
    }

    const res = getInvoiceItemsSchema.parse(invoiceItems.data);

    console.log(res)
    return NextResponse.json(res);
}