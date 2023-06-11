import { Loader, Menu } from 'lucide-react';
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
import { useSession } from 'next-auth/react';
import DashboardLinks from './DashboardLinks';

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
						<DashboardLinks />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default MenuHamburguer;
