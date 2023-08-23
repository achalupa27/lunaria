import Image from 'next/image';

const PostBanner3 = () => {
    return (
        <div className='mt-40 flex h-fit w-full max-w-7xl flex-col items-center'>
            <div className='text-5xl font-bold'>Enjoy the Bloom.</div>
            <Image className='relative my-12 mb-24' src='/bouquet.png' alt='' width={900} height={500} />
        </div>
    );
};

export default PostBanner3;
