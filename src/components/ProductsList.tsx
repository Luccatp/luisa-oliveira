'use client';
import { data } from 'autoprefixer';
import { Loader2 } from 'lucide-react';
import error from 'next/error';
import { FC } from 'react';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import { GetProductsType } from '@/lib/validations/stripe';

interface ProductsListProps {}

const ProductsList: FC<ProductsListProps> = ({}) => {
	const { data, isLoading, error } = useQuery('products', async () => {
		const res = await fetch('/api/getAll-products');
		return await res.json();
	});
	console.log(data);
	return (
		<>
			{!isLoading ? (
				!error ? (
					data.map((product: GetProductsType[0]) => (
						<ProductCard
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
		</>
	);
};

export default ProductsList;
