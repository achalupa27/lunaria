const DashboardSection = () => {
    return (
        <section className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Your Financial Dashboard</h2>
            <p className='text-lg text-gray-600'>Get a complete overview of your personal finances, including income, savings, and spending.</p>
            <div className='mt-12 flex justify-center'>
                <div className='w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-8 shadow-md'>
                    <h3 className='mb-4 text-2xl font-semibold'>Track Your Finances</h3>
                    <p className='text-lg text-gray-600'>Effortlessly monitor your financial health with interactive charts and reports.</p>
                    <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
                        <div className='rounded-lg bg-blue-50 p-4'>
                            <h4 className='text-xl font-medium'>Income</h4>
                            <p className='text-gray-500'>See all your revenue sources in one place.</p>
                        </div>
                        <div className='rounded-lg bg-green-50 p-4'>
                            <h4 className='text-xl font-medium'>Savings</h4>
                            <p className='text-gray-500'>Track how much you're setting aside for the future.</p>
                        </div>
                        <div className='rounded-lg bg-red-50 p-4'>
                            <h4 className='text-xl font-medium'>Spending</h4>
                            <p className='text-gray-500'>Analyze your expenses and optimize your budget.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardSection;
