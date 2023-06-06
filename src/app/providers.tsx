'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

type Props = {
	children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
	return (
		<SessionProvider>
			<Toaster
				position='top-center'
				reverseOrder={false}
			/>
			{children}
		</SessionProvider>
	);
};
