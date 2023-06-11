import {z} from 'zod'


export const checkoutSessionSchema = z.object({
    items: z.array(
        z.object({
            price: z.string(),
            quantity: z.number().int(),
        })
    )
})

export type CheckoutSessionType = z.infer<typeof checkoutSessionSchema> 

export const getProductsSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        images: z.array(z.string()),
        default_price: z.object({
            id: z.string(),
            unit_amount: z.number(),
            type: z.string(),
        })
    })
)

export type GetProductsType = z.infer<typeof getProductsSchema>

export const getPaymentIntentsSchema = z.array(
    z.object({
        id: z.string(),
        amount: z.number(),
        payment_method_types: z.array(
            z.string()
        )
    })
)

export type GetPaymentIntentsType = z.infer<typeof getPaymentIntentsSchema>