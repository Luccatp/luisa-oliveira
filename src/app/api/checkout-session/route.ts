
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/utils'
import { checkoutSessionSchema } from '@/lib/validations/stripe'
import { getToken } from 'next-auth/jwt'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const req = checkoutSessionSchema.parse(body)
    const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
    const stripe = getStripe();

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

    return NextResponse.json({url: checkout.url});
}