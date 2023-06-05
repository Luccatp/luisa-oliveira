'use client';
import { FC } from 'react';
import { useSession } from 'next-auth/react';

interface userProps {}

const User: FC<userProps> = ({}) => {
	const { data: session } = useSession();

	return (
		<>
			<h1>Client Session</h1>
			<pre>{JSON.stringify(session)}</pre>
		</>
	);
};

export default User;
