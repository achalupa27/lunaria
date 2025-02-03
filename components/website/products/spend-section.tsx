import Card from '@/components/ui/card';

const SpendSection = () => {
    return (
        <section id='spend' className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Smart Spending</h2>
            <p className='text-lg text-gray-600'>Optimize your expenses and make informed financial decisions.</p>
            <div className='mt-12 flex justify-center gap-8'>
                <Card>
                    <h4 className='text-xl font-medium'>Essentials</h4>
                    <p className='text-gray-500'>Manage necessary living expenses like rent and groceries.</p>
                </Card>
                <Card>
                    <h4 className='text-xl font-medium'>Discretionary</h4>
                    <p className='text-gray-500'>Keep track of entertainment and non-essential purchases.</p>
                </Card>
                <Card>
                    <h4 className='text-xl font-medium'>Investments</h4>
                    <p className='text-gray-500'>Allocate funds towards future financial growth.</p>
                </Card>
            </div>
        </section>
    );
};

export default SpendSection;
