import { prisma } from "@/lib/prisma";
import getStripe from "@/lib/loading-stripe";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getInvoiceItemsSchema } from "@/lib/validations/stripe";

export async function GET(req: NextRequest) {
    const stripe = getStripe();
    const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
    
    if(!token || !token.stripeId) {
        return NextResponse.error()
    }


    const invoiceItems = await stripe.invoiceItems.list({
        customer: token.stripeId as string,
        expand: ['data.price.product'],
    });

    console.log(invoiceItems)
    

    if(!invoiceItems || invoiceItems.data.length === 0) {
        return NextResponse.error()
    }

    const res = getInvoiceItemsSchema.parse(invoiceItems.data);

    return NextResponse.json(res);
}