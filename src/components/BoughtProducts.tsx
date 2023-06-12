'use client';
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
import { ArrowRightCircle } from 'lucide-react';

interface BoughtProductsProps {
	title: string;
	description: string;
	image: string;
}

const BoughtProducts: FC<BoughtProductsProps> = ({
	title,
	description,
	image
}) => {
	const handleClick = () => {
		console.log('clicked');
	};
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
			<CardFooter className='flex w-full justify-end'>
				<ArrowRightCircle className='w-6 h-6' />
			</CardFooter>
		</Card>
	);
};

export default BoughtProducts;
