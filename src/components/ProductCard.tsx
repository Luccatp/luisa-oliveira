import { FC } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from './ui/card';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

interface ProductCardProps {
	title: string;
	description: string;
	price: number;
	image: string;
	id: string;
	handleClick: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
	title,
	description,
	id,
	image,
	price,
	handleClick
}) => {
	return (
		<Card
			className='w-64 h-96 flex flex-col justify-between'
			onClick={handleClick}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className='relative h-52 mx-7'>
				{image && (
					<Image
						src={image}
						alt={title}
						fill
					/>
				)}
			</CardContent>
			<CardFooter>
				<p className='text-right w-full'>
					R${price.toString().slice(0, -2) + ',' + price.toString().slice(-2)}
				</p>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
