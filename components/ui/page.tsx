'use client';

type Props = {
    children: React.ReactNode;
};

const Page = ({ children }: Props) => {
    return <div className='flex h-screen w-screen flex-col gap-4 p-6'>{children}</div>;
};

export default Page;
