import Feature from '../components/Feature';
import features from '../data/features.json';

const Features = () => {
    return (
        <div className='mx-auto my-8 min-h-screen max-w-5xl space-y-20 px-20 pb-8'>
            <h1 className='flex w-full justify-center'>Feature Rich.</h1>
            {features.map((feature: Feature) => (
                <Feature key={feature.name} img={feature.img} name={feature.name} description={feature.description} comingSoon={feature.comingSoon} />
            ))}
            <h2 className='flex w-full justify-center'>Start improving today.</h2>
        </div>
    );
};

export default Features;
