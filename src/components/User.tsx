'use client';
import { FC } from 'react';
import { useSession } from 'next-auth/react';

interface userProps {}

const User: FC<userProps> = ({}) => {
	const { data: session } = useSession();

	return (
		<div className='flex flex-col w-[90%]'>
			<h1>Client Session</h1>
			<p className='break-words'>{JSON.stringify(session)}</p>
		</div>
	);
};

export default User;
