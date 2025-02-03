import Card from '@/components/ui/card';

const DashboardSection = () => {
    return (
        <section id='dashboard' className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Your Financial Dashboard</h2>
            <p className='text-lg text-gray-600'>Get a complete overview of your personal finances, including income, savings, and spending.</p>
            <div className='mt-12 flex justify-center gap-8'>
                <Card>
                    <h4 className='text-xl font-medium'>Income</h4>
                    <p className='text-gray-500'>See all your revenue sources in one place.</p>
                </Card>
                <Card>
                    <h4 className='text-xl font-medium'>Savings</h4>
                    <p className='text-gray-500'>Track how much you&apos;re setting aside for the future.</p>
                </Card>
                <Card>
                    <h4 className='text-xl font-medium'>Spending</h4>
                    <p className='text-gray-500'>Analyze your expenses and optimize your budget.</p>
                </Card>
            </div>
        </section>
    );
};

export default DashboardSection;
