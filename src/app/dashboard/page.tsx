'use client';
import BoughtProducts from '@/components/BoughtProducts';
import { GetInvoiceItemsType } from '@/lib/validations/stripe';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

interface PagesProps {}

const Pages = ({}) => {
	const { data, isLoading, error } = useQuery('user products', async () => {
		const res = await fetch('/api/user/payments');
		return await res.json();
	});
	return (
		<div className='flex gap-20 flex-col items-center py-20'>
			<h1 className='font-bold text-gray-400 tracking-wide text-2xl'>
				Dashboard
			</h1>
			<div className='flex gap-10 flex-wrap justify-center'>
				{!isLoading ? (
					!error ? (
						data.map((product: GetInvoiceItemsType[0]) => (
							<BoughtProducts
								key={product.id}
								title={product.description}
								description={product.price.product.description}
								image={product.price.product.images[0]}
							/>
						))
					) : (
						<p>
							Um erro inesperado ocorreu, por favor tente novamente mais tarde.
						</p>
					)
				) : (
					<Loader2 className='text-pink-400 animate-spin' />
				)}
			</div>
		</div>
	);
};

export default Pages;
