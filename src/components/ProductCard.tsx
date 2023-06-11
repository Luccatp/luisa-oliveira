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

interface ProductCardProps {
	title: string;
	description: string;
	price: number;
	image: string;
	id: string;
}

const ProductCard: FC<ProductCardProps> = ({
	title,
	description,
	id,
	image,
	price
}) => {
	return (
		<Card className='w-64 h-64 flex flex-col justify-between'>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{image && (
					<Image
						width={300}
						height={100}
						src={image}
						alt={title}
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
