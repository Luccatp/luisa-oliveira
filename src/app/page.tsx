import User from '@/components/User';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export default async function Home() {
	const server = await getServerSession(authOptions);
	return (
		<main>
			<h1>Server Session</h1>
			<pre>{JSON.stringify(server)}</pre>
			<User />
		</main>
	);
}
