'use client';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

interface LoginButtonProps {}

const LoginButton: FC<LoginButtonProps> = ({}) => {
	return (
		<Button
			variant={'outline'}
			onClick={() => signIn()}>
			Login
		</Button>
	);
};

export default LoginButton;
