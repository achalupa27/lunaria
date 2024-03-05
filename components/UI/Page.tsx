type Props = {
    children: React.ReactNode;
};

const Page = ({ children }: Props) => {
    return <div className='h-screen w-screen gap-2 px-10 py-6'>{children}</div>;
};

export default Page;
