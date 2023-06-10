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
			<section className='flex flex-wrap w-full gap-20 mt-10'>
				<Image
					className='hidden md:block'
					src={'/hero.svg'}
					alt='productivity'
					width={500}
					height={500}
				/>
				<h2 className='font-black text-3xl'>
					Seja a melhor social media topzera dos guri
				</h2>
			</section>
		</main>
	);
}
