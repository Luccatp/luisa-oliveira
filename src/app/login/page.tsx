import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/components/User';
import LoginButton from '@/components/LoginButton';
import SignoutButton from '@/components/SignoutButton';

interface PageProps {}

const Page = async ({}) => {
	const session = await getServerSession(authOptions);
	return (
		<div>
			<h1>Login</h1>
			<LoginButton />
			<SignoutButton />
			<h1>Server Session</h1>
			<pre>{JSON.stringify(session)}</pre>

			<User />
		</div>
	);
};

export default Page;
