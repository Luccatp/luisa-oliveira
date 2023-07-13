import Button from '@/components/AsyncButton';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import { GetProductsType } from '@/lib/validations/stripe';
import { Dot, ShoppingCart, X } from 'lucide-react';
import { FC } from 'react';

interface CartProps {
	selectedProducts: GetProductsType;
	removeProduct: (id: string) => void;
	buyProducts: () => void;
}

const Cart: FC<CartProps> = ({
	selectedProducts,
	removeProduct,
	buyProducts
}) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					className='w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0 relative'>
					{selectedProducts.length > 0 && (
						<div className='absolute top-0 right-1.5'>
							<span className='relative font-bold text-xs'>
								{selectedProducts.length}
							</span>
							<Dot className='absolute bottom-2 left-0 text-blue-800 animate-bounce' />
						</div>
					)}
					<ShoppingCart className='h-6 w-6 sm:h-7 sm:w-7' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				{selectedProducts.length > 0 ? (
					<div className='flex flex-col gap-2 p-2'>
						{selectedProducts.map((product) => (
							<div
								className='flex flex-col gap-2'
								key={product.id}>
								<div className='flex flex-row items-center justify-between'>
									<p className='text-gray-500 font-bold flex items-center gap-2'>
										<X
											className='h-4 w-4 text-red-400'
											strokeWidth={3}
											onClick={() => removeProduct(product.id)}
										/>
										{product.name}
									</p>
									<p className='text-gray-400 font-semibold text-xs'>
										R$
										{product.default_price.unit_amount.toString().slice(0, -2) +
											',' +
											product.default_price.unit_amount.toString().slice(-2)}
									</p>
								</div>
							</div>
						))}
						<div className='flex flex-row justify-between border-t-2 border-gray-400'>
							<p className='text-gray-500 font-bold'>Total</p>
							<p className='text-gray-500 font-bold'>
								R$
								{selectedProducts.reduce(
									(acc, curr) =>
										acc +
										Number.parseInt(
											curr.default_price.unit_amount.toString().slice(0, -2)
										),
									0
								)}
							</p>
						</div>
						<Button onClick={buyProducts}>Finalizar compra</Button>
					</div>
				) : (
					<div className='flex flex-col gap-2 p-2'>
						<p className='text-gray-500 font-bold'>
							Nenhum produto selecionado
						</p>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
};

export default Cart;
