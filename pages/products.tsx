import Link from 'next/link';
import Feature from '../components/website/Feature';
import features from '../data/features.json';

const Features = () => {
    const user = false;

    return (
        <div className='mx-auto min-h-screen max-w-5xl space-y-20 px-20 pb-8 pt-32'>
            <h1 className='flex w-full justify-center bg-gradient-to-r from-l-yellow via-l-green to-l-blue bg-clip-text text-4xl font-semibold tracking-tighter text-transparent md:text-6xl'>Get all the stats.</h1>
            {features.map((feature: FeatureItem) => (
                <Feature key={feature.name} img={feature.img} name={feature.name} description={feature.description} comingSoon={feature.comingSoon} />
            ))}
            <h2 className='flex w-full justify-center'>Start improving today.</h2>
            <div className='flex w-full justify-center'>
                {user ? null : (
                    <Link href='/pricing'>
                        <div className='group flex items-center justify-center'>
                            <button className='button-primary-alt px-8 py-3 font-medium text-zinc-900 hover:border'>
                                Get Started
                                <i className='fi fi-bs-angle-right pl-2 text-zinc-700' />
                            </button>
                            <button className='btn2 transition duration-200 group-hover:visible'></button>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Features;
