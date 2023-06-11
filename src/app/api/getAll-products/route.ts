import { NextResponse } from 'next/server'
import { getProductsSchema } from '@/lib/validations/stripe'
import { Stripe } from '@stripe/stripe-js';
import getStripe from '@/lib/loading-stripe';

export async function GET() {
    const stripe = getStripe(); 
    const products = await stripe.products.list({  
        active: true,
        expand: ['data.default_price'],
    })

    const response = getProductsSchema.parse(products.data);

    return NextResponse.json(response);
}
