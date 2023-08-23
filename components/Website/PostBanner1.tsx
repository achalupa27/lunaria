import Image from 'next/image';

const PostBanner1 = () => {
    return (
        <div className='mt-40 flex h-[600px] w-full max-w-7xl flex-col items-center'>
            <div className='text-3xl font-bold'>Plant the Seeds of Success.</div>
            <div>By tracking your money, you prime your brain for improvement.</div>
            <Image className='relative my-20 rotate-45' src='/seeds.png' alt='' width={500} height={500} />
        </div>
    );
};

export default PostBanner1;
