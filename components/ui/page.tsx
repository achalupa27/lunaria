'use client';

type Props = {
    children: React.ReactNode;
};

const Page = ({ children }: Props) => {
    return <div className='max-w-screen flex h-screen max-h-screen w-screen flex-col gap-2 overflow-auto bg-zinc-50 px-10 py-6'>{children}</div>;
};

export default Page;
