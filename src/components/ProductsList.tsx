'use client';
import { data } from 'autoprefixer';
import { Loader2 } from 'lucide-react';
import error from 'next/error';
import { FC } from 'react';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';

interface ProductsListProps {}

const ProductsList: FC<ProductsListProps> = ({}) => {
	const { data, isLoading, error } = useQuery('products', async () => {
		const res = await fetch('/api/getAll-products');
		return await res.json();
	});
	return (
		<>
			{!isLoading ? (
				!error ? (
					data.map(
						(product: {
							id: string;
							name: string;
							description: string;
							price: number;
							image: string;
						}) => (
							<ProductCard
								key={product.id}
								title={product.name}
								description={product.description}
								price={product.price}
								image={product.image}
								id={product.id}
							/>
						)
					)
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
