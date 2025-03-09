import Card from '@/components/ui/card';

type Props = {
    children: React.ReactNode;
    title: string;
    button?: React.ReactNode;
};

const DisplayCard = ({ children, title, button }: Props) => {
    return (
        <Card className='flex flex-col h-full'>
            <div className='p-2 flex flex-col h-full'>
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    {button}
                </div>
                <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>{children}</div>
            </div>
        </Card>
    );
};

export default DisplayCard;
