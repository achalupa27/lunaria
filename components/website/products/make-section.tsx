import Card from '@/components/ui/card';

const MakeSection = () => {
    return (
        <section id='make' className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Make More Money</h2>
            <p className='text-lg text-gray-600'>Increase your income by identifying new opportunities and optimizing your earnings.</p>
            <div className='mt-12 flex justify-center gap-8 w-full'>
                <Card className='px-12 py-10'>
                    <h4 className='text-xl font-medium'>Active Income</h4>
                    <p className='text-gray-500'>Monitor your salary, freelancing, and side gigs.</p>
                </Card>
                <Card className='px-12 py-10'>
                    <h4 className='text-xl font-medium'>Passive Income</h4>
                    <p className='text-gray-500'>Track dividends, investments, and rental income.</p>
                </Card>
                <Card className='px-12 py-10'>
                    <h4 className='text-xl font-medium'>New Opportunities</h4>
                    <p className='text-gray-500'>Find ways to increase your earnings and achieve financial freedom.</p>
                </Card>
            </div>
        </section>
    );
};

export default MakeSection;
