'use client';
import Button from '@/components/ui/Button';
import { CheckoutSessionType } from '@/lib/validations/stripe';
import axios, { AxiosError } from 'axios';
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
			const checkoutSessionUrl = await axios.post(
				'/api/checkout-session',
				body
			);

			console.log('front' + checkoutSessionUrl.data.url);
			window.location.href = checkoutSessionUrl.data.url;
		} catch (e) {
			if (e instanceof AxiosError) console.log(e.response?.data);
			return toast.error('Erro criando uma sessão de pagamento');
		}
	};

	const getUserPayments = async () => {
		try {
			const userPayments = await axios.get('/api/user/payments');
			console.log(userPayments);
		} catch (e) {
			if (e instanceof AxiosError) console.log(e.response?.data);
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
