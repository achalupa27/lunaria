import Image from 'next/image';

const BonusSection = () => {
    return (
        <div className='my-36 flex rounded-xl border border-blue-900/20 text-zinc-600'>
            <Image src='/lunaria-plant.png' alt='lunaria plant' width={200} height={200} className='rounded-xl' />
            <div className='flex flex-col px-8 py-4'>
                <span className='text-4xl font-semibold italic'>Lunaria annua</span>
                <span className='-mt-2'>• the money plant</span>
                <span className='pt-14'>
                    Lunaria annua, often referred to as honesty, <br />
                    symbolizes that financial integrity brings real wealth.
                </span>
            </div>
        </div>
    );
};

export default BonusSection;
