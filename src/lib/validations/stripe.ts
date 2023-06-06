import {z} from 'zod'


export const checkoutSessionSchema = z.object({
    items: z.array(
        z.object({
            price: z.string(),
            quantity: z.number().int(),
        })
    ),
    email: z.string().email(),
})

export type CheckoutSessionType = z.infer<typeof checkoutSessionSchema> 

export const getProductsSchema = z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        images: z.array(z.string()),
        default_price: z.string(),
    })
)