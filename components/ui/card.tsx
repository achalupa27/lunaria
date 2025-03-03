'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: any;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

const cardVariants = cva('w-auto rounded-2xl flex flex-col bg-white border-orange-100 border px-6 py-4 shadow transition duration-200 dark:border-orange-200 dark:bg-zinc-910 dark:shadow-orange-300/20 dark:shadow-md', {
    variants: {
        variant: {
            default: '',
            hovered: 'hover:cursor-pointer hover:bg-zinc-100 hover:shadow-md',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const Card = ({ children, onClick, variant, className, ...props }: Props) => {
    return (
        <div className={cn(cardVariants({ variant, className }))} onClick={onClick} {...props}>
            {children}
        </div>
    );
};

export default Card;
