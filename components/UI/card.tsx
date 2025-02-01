import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: any;
    className?: string;
} & React.HTMLProps<HTMLDivElement>;

const cardVariants = cva('w-auto rounded-2xl border-1 px-6 py-4 shadow transition duration-200 dark:border-zinc-800 dark:bg-gray-950', {
    variants: {
        variant: {
            default: 'bg-white border-zinc-50',
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
