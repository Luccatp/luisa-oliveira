import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { getProductsSchema } from '@/lib/validations/stripe'
import { useStripe } from '@/lib/utils'

export async function GET() {
    const stripe = useStripe();
    const products = await stripe.products.list({  
        active: true,
    })

    const response = getProductsSchema.parse(products.data);
    return NextResponse.json(response);
}