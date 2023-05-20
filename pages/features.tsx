import Link from 'next/link';
import Feature from '../components/Website/Feature';
import features from '../data/features.json';

const Features = () => {
    const user = false;

    return (
        <div className='mx-auto min-h-screen max-w-5xl space-y-20 px-20 pt-24 pb-8'>
            <h1 className='flex w-full justify-center'>Get all the stats.</h1>
            {features.map((feature: Feature) => (
                <Feature key={feature.name} img={feature.img} name={feature.name} description={feature.description} comingSoon={feature.comingSoon} />
            ))}
            <h2 className='flex w-full justify-center'>Start improving today.</h2>
            <div className='flex w-full justify-center'>
                {user ? (
                    <Link href='/dashboard' className='button-primary w-52 hover:scale-105 active:scale-90'>
                        <i className='fi fi-rr-arrow-up-right -ml-[3px] mt-[2px] pr-2'></i>
                        <span>Open Dashboard</span>
                    </Link>
                ) : (
                    <Link href='/register' className='button-primary w-52 space-x-2 font-semibold'>
                        <span>Get Started</span>
                        <i className='fi fi-rr-arrow-right'></i>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Features;
