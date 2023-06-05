'use client';
import { FC } from 'react';
import Button from './ui/Button';
import { signIn } from 'next-auth/react';

interface LoginButtonProps {}

const LoginButton: FC<LoginButtonProps> = ({}) => {
	return (
		<Button
			variant={'border'}
			onClick={() => signIn()}>
			Login
		</Button>
	);
};

export default LoginButton;
