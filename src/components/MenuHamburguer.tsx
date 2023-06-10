import { Menu } from 'lucide-react';
import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import Link from 'next/link';
import { Button } from './ui/button';

interface MenuHamburguerProps {}

const MenuHamburguer: FC<MenuHamburguerProps> = ({}) => {
	return (
		<Dialog>
			<DialogTrigger className='md:hidden'>
				<Menu />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-col gap-10'>
					<DialogTitle className='text-center'>
						Para qual local você deseja ir?
					</DialogTitle>
					<DialogDescription className='grid gap-10 justify-center'>
						<Link
							href='/'
							className='text-center w-full'>
							Home
						</Link>
						<Link
							href='/produtos'
							className='text-center w-full'>
							Produtos
						</Link>
						<Link
							href='/dashboard'
							className='text-center w-full'>
							Dashboard
						</Link>
						<Link
							href='/login'
							className='text-center'>
							<Button>Login</Button>
						</Link>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default MenuHamburguer;
