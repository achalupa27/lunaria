import Link from 'next/link';
import Feature from '../components/Website/Feature';
import features from '../data/features.json';

const Features = () => {
    const user = false;

    return (
        <div className='mx-auto min-h-screen max-w-5xl space-y-20 px-20 pt-32 pb-8'>
            <h1 className='flex w-full justify-center bg-gradient-to-r from-[#f7ebc0] via-[#99f5d1] to-[#93c5fd] bg-clip-text text-4xl font-semibold tracking-tighter text-transparent md:text-6xl'>Get all the stats.</h1>
            {features.map((feature: Feature) => (
                <Feature key={feature.name} img={feature.img} name={feature.name} description={feature.description} comingSoon={feature.comingSoon} />
            ))}
            <h2 className='flex w-full justify-center'>Start improving today.</h2>
            <div className='flex w-full justify-center'>
                {user ? null : (
                    <Link href='/register' className='button-primary-alt w-52 space-x-2 font-semibold'>
                        <span>Get Started</span>
                        <i className='fi fi-rr-arrow-right'></i>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Features;
