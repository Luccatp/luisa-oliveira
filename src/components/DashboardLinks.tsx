'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';

interface DashboardLinksProps {}

const DashboardLinks: FC<DashboardLinksProps> = ({}) => {
	const token = useSession().status === 'authenticated';
	return (
		<>
			<DialogClose asChild>
				<Link
					href='/'
					className='text-center w-full'>
					Home
				</Link>
			</DialogClose>
			<DialogClose asChild>
				<Link
					href='/produtos'
					className='text-center w-full'>
					Produtos
				</Link>
			</DialogClose>
			<DialogClose asChild>
				<Link
					href='/dashboard'
					className={`text-center w-full ${
						token ? '' : 'text-gray-200 pointer-events-none'
					}`}>
					Dashboard
				</Link>
			</DialogClose>
			<DialogClose asChild>
				<Link
					href='/agendar-horario'
					className='text-center w-full'>
					Agendar um horário
				</Link>
			</DialogClose>
			<DialogClose asChild>
				<Link
					href='/login'
					className='text-center'>
					<Button>Login</Button>
				</Link>
			</DialogClose>
		</>
	);
};

export default DashboardLinks;
