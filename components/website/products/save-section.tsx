import Card from '@/components/ui/card';

const SaveSection = () => {
    return (
        <section id='save' className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Build Your Savings</h2>
            <p className='text-lg text-zinc-600'>Set aside money for the future and watch your savings grow over time.</p>
            <div className='mt-12 flex justify-center gap-8'>
                <Card>
                    <h4 className='text-xl font-medium'>Emergency Fund</h4>
                    <p className='text-zinc-500'>Be prepared for unexpected expenses.</p>
                </Card>
                <Card>
                    <h4 className='text-xl font-medium'>Investments</h4>
                    <p className='text-zinc-500'>Grow your wealth over time with smart investing.</p>
                </Card>
                <Card>
                    <h4 className='text-xl font-medium'>Debt Management</h4>
                    <p className='text-zinc-500'>Plan ahead for major expenses.</p>
                </Card>
            </div>
        </section>
    );
};

export default SaveSection;
