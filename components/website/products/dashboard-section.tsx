import Card from '@/components/ui/card';

const DashboardSection = () => {
    return (
        <section className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Your Financial Dashboard</h2>
            <p className='text-lg text-gray-600'>Get a complete overview of your personal finances, including income, savings, and spending.</p>
            <div className='mt-12 flex justify-center'>
                <Card className='px-12 py-10'>
                    <h3 className='mb-4 text-2xl font-semibold'>Track Your Finances</h3>
                    <p className='text-lg text-gray-600'>Effortlessly monitor your financial health with interactive charts and reports.</p>
                    <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
                        <div className='rounded-lg bg-blue-50 p-4'>
                            <h4 className='text-xl font-medium'>Income</h4>
                            <p className='text-gray-500'>See all your revenue sources in one place.</p>
                        </div>
                        <div className='rounded-lg bg-green-50 p-4'>
                            <h4 className='text-xl font-medium'>Savings</h4>
                            <p className='text-gray-500'>Track how much you&apos;re setting aside for the future.</p>
                        </div>
                        <div className='rounded-lg bg-red-50 p-4'>
                            <h4 className='text-xl font-medium'>Spending</h4>
                            <p className='text-gray-500'>Analyze your expenses and optimize your budget.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default DashboardSection;
