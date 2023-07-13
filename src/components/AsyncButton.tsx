import { ButtonHTMLAttributes, FC, HTMLProps } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';

interface AsyncButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

const AsyncButton: FC<AsyncButtonProps> = ({
	isLoading,
	children,
	...props
}) => {
	return (
		<Button {...props}>
			{isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}{' '}
			{children}
		</Button>
	);
};

export default AsyncButton;
