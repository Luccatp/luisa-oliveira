'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Query, QueryClient, QueryClientProvider } from 'react-query';

type Props = {
	children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
	const queryClient = new QueryClient();
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<Toaster
					position='top-center'
					reverseOrder={false}
				/>
				{children}
			</QueryClientProvider>
		</SessionProvider>
	);
};
