import EventCalendar from '@/components/EventCalendar';
import MenuHamburguer from '@/components/MenuHamburguer';
import User from '@/components/User';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export default async function Home() {
	const server = await getServerSession(authOptions);
	return (
		<main className='w-full h-screen px-2 flex flex-col items-center '>
			<section className='flex flex-wrap w-full gap-20 mb-56'>
				<div className='flex flex-col h-screen w-full justify-center items-center gap-5 mb-52'>
					<h2 className='font-black w-full text-3xl text-center text-gray-800'>
						Social Media
					</h2>
				</div>
				<div className='w-full flex flex-col items-center'>
					<p className='text-gray-600 font-semibold text-center'>
						Seja bem vindo,{' '}
						{server?.user?.name
							? server.user.name
							: 'faça login para aproveitar toda a plataforma'}
					</p>
				</div>
				<User />
			</section>
		</main>
	);
}
