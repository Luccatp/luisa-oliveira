'use client';
import { FC } from 'react';
import Button from './AsyncButton';
import { signOut } from 'next-auth/react';

interface SignoutButtonProps {}

const SignoutButton: FC<SignoutButtonProps> = ({}) => {
	return (
		<Button
			onClick={() => signOut()}
			isLoading={false}>
			SignOut
		</Button>
	);
};

export default SignoutButton;
