import Image from 'next/image';

const PostBanner2 = () => {
    return (
        <div className='h--fit mt-40 flex w-full max-w-7xl flex-col items-center'>
            <div className='text-4xl font-bold'>Watch Your Nature Thrive.</div>
            <div>
                Your brain will <span>subconsciously</span> work to <span>optimize</span> what it sees.
            </div>
            <Image className='relative mb-6' src='/seedling.png' alt='' width={600} height={600} />
        </div>
    );
};

export default PostBanner2;
