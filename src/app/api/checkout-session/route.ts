
import { NextRequest, NextResponse } from 'next/server'
import getStripe from '@/lib/loading-stripe'
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

    if(token.stripeId === null) {
        const customer = await stripe.customers.create({
            email: token.email as string,
            name: token.name as string,
        })

        if(!customer || !customer.id || !customer.email) {
            return NextResponse.json({error: 'Erro ao criar usuário'}, {status: 500})
        }
        token.stripeId = customer.id;
        
        const checkout = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/',
            line_items: req.items,
            customer: customer.id, 
            customer_email: customer.email,
            mode: 'payment',
            invoice_creation: {enabled: true},
        })
        
        if(!checkout || !checkout.url) {
            return NextResponse.json({error: 'Erro ao criar sessão de checkout'}, {status: 500})
        }

        return NextResponse.json({url: checkout.url});
    }
    
    const checkout = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/',
        line_items: req.items,
        customer: token.stripeId as string, 
        customer_email: token.email as string,
        mode: 'payment',
        invoice_creation: {enabled: true},
    })

    if(!checkout || !checkout.url) {
        return NextResponse.json({error: 'Erro ao criar sessão de checkout'}, {status: 500})
    }

    return NextResponse.json({url: checkout.url});

}