'use client';
import { FC } from 'react';
import Button from './ui/Button';
import { signOut } from 'next-auth/react';

interface SignoutButtonProps {}

const SignoutButton: FC<SignoutButtonProps> = ({}) => {
	return <Button onClick={() => signOut()}>SignOut</Button>;
};

export default SignoutButton;
