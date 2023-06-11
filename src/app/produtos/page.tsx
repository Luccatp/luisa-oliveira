import ProductCard from '@/components/ProductCard';
import ProductsList from '@/components/ProductsList';
import { Loader2 } from 'lucide-react';
import { FC, Key } from 'react';
import { useQuery } from 'react-query';

interface pageProps {}

const Page = async ({}: pageProps) => {
	return (
		<div className='flex flex-wrap items-center justify-center h-96 w-full gap-4'>
			<ProductsList />
		</div>
	);
};

export default Page;
