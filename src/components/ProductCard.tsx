import { FC } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from './ui/card';

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
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
