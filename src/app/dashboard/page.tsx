'use client';
import Button from '@/components/ui/Button';
import { CheckoutSessionType } from '@/lib/validations/stripe';
import axios from 'axios';
import { FC } from 'react';

interface pagesProps {}

const pages: FC<pagesProps> = ({}) => {
	const buyProducts = async () => {
		const body: CheckoutSessionType = {
			items: [
				{
					price: 'price_1NG5pwAELPJChHvaulT6ztes',
					quantity: 1
				}
			],
			email: 'lucca@gmail.com'
		};

		await axios.post('/api/checkout-session', body, {
			headers: {
				'Content-Type': 'application/json',
				cache: 'no-cache'
			}
		});
	};
	return (
		<div>
			<h1>Dashboard</h1>
			<Button
				size={'lg'}
				onClick={buyProducts}>
				Buy products
			</Button>
		</div>
	);
};

export default pages;
