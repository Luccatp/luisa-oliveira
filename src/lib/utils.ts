import {clsx, ClassValue}  from "clsx";
import Stripe from "stripe";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
} 

export function useStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: '2022-11-15'})
}