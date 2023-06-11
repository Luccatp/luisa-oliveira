'use client';
import Button from '@/components/AsyncButton';
import { CheckoutSessionType } from '@/lib/validations/stripe';
import { FC } from 'react';
import { toast } from 'react-hot-toast';

interface pagesProps {}

const pages: FC<pagesProps> = ({}) => {
	const buyProducts = async () => {
		const body: CheckoutSessionType = {
			items: [
				{
					price: 'price_1NG5pwAELPJChHvaulT6ztes',
					quantity: 1
				}
			]
		};

		try {
			const checkoutSessionUrl: { url: string } = await fetch(
				'/api/checkout-session',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(body)
				}
			).then((res) => res.json());
			console.log(checkoutSessionUrl);
			window.location.href = checkoutSessionUrl.url;
		} catch (e) {
			return toast.error('Erro criando uma sessão de pagamento');
		}
	};

	const getUserPayments = async () => {
		try {
			const userPayments = await fetch('/api/user/payments').then((res) =>
				res.json()
			);
			console.log(userPayments);
		} catch (e) {
			console.log(e);
			return toast.error('Erro ao buscar os pagamentos do usuário');
		}
	};
	return (
		<div>
			<h1>Dashboard</h1>
			<Button
				size={'lg'}
				onClick={buyProducts}>
				Buy products
			</Button>
			<Button
				size={'lg'}
				onClick={getUserPayments}>
				Get User Payments
			</Button>
		</div>
	);
};

export default pages;
