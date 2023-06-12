'use client';
import { data } from 'autoprefixer';
import { Loader2 } from 'lucide-react';
import error from 'next/error';
import { FC, useState } from 'react';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import { CheckoutSessionType, GetProductsType } from '@/lib/validations/stripe';
import { get } from 'http';
import Cart from './Cart';
import toast from 'react-hot-toast';
import { ApiError } from 'next/dist/server/api-utils';

interface ProductsListProps {}

const ProductsList: FC<ProductsListProps> = ({}) => {
	const [selectedProducts, setSelectedProducts] = useState<GetProductsType>([]);
	const { data, isLoading, error } = useQuery('products', async () => {
		const res = await fetch('/api/getAll-products');
		return await res.json();
	});

	const removeProduct = (id: string) => {
		setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
	};

	const buyProducts = async () => {
		const body: CheckoutSessionType = {
			items: selectedProducts.map((product) => ({
				price: product.default_price.id,
				quantity: 1
			}))
		};

		try {
			const checkoutSessionUrl = await fetch('/api/checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			}).then((res) => {
				if (res.status === 500)
					throw new Error('Erro ao criar a sessão de checkout');
				if (res.status === 401)
					throw new Error('Você precisa estar logado para comprar os produtos');
				return res.json();
			});

			if (checkoutSessionUrl.url) window.location.href = checkoutSessionUrl.url;
		} catch (e: any) {
			return toast.error(e.message);
		}
	};

	return (
		<>
			{!isLoading ? (
				!error ? (
					data.map((product: GetProductsType[0]) => (
						<ProductCard
							handleClick={() =>
								setSelectedProducts((prev) =>
									prev.includes(product) ? prev : [...prev, product]
								)
							}
							key={product.id}
							title={product.name}
							description={product.description}
							price={product.default_price.unit_amount}
							image={product.images[0]}
							id={product.id}
						/>
					))
				) : (
					<p className='text-gray-500 font-bold'>
						Erro ao carregar os produtos
					</p>
				)
			) : (
				<Loader2 className='w-10 h-10 text-pink-400 animate-spin' />
			)}
			<div className='fixed bottom-[5%] right-10 sm:right-[50%] translate-x-1/2'>
				<Cart
					selectedProducts={selectedProducts}
					removeProduct={removeProduct}
					buyProducts={buyProducts}
				/>
			</div>
		</>
	);
};

export default ProductsList;
