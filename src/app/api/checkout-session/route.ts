import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { get } from 'http'
import { useStripe } from '@/lib/utils'
import { checkoutSessionSchema } from '@/lib/validations/stripe'
import { LineItem } from '@stripe/stripe-js'
import { getToken } from 'next-auth/jwt'

export async function POST(request: any) {
    const body = await request.json()
    const req = checkoutSessionSchema.parse(body)
    const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
    const stripe = useStripe();

    if(!token || !token.email) {
        return NextResponse.json({error: 'Você precisa estar logado para comprar'}, {status: 401})
    }

    const checkout = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/',
        line_items: req.items,
        customer_email: token.email,
        mode: 'payment',
    })

    if(!checkout || !checkout.url) {
        return NextResponse.json({error: 'Erro ao criar sessão de checkout'}, {status: 500})
    }

    console.log("URL: " + checkout.url)

    return NextResponse.redirect(checkout.url);
}