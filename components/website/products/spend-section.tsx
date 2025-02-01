const SpendSection = () => {
    return (
        <section className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Smart Spending</h2>
            <p className='text-lg text-gray-600'>Optimize your expenses and make informed financial decisions.</p>
            <div className='mt-12 flex justify-center'>
                <div className='w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-8 shadow-md'>
                    <h3 className='mb-4 text-2xl font-semibold'>Track Your Expenses</h3>
                    <p className='text-lg text-gray-600'>Understand where your money is going and adjust accordingly.</p>
                    <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
                        <div className='rounded-lg bg-red-50 p-4'>
                            <h4 className='text-xl font-medium'>Essentials</h4>
                            <p className='text-gray-500'>Manage necessary living expenses like rent and groceries.</p>
                        </div>
                        <div className='rounded-lg bg-yellow-50 p-4'>
                            <h4 className='text-xl font-medium'>Discretionary</h4>
                            <p className='text-gray-500'>Keep track of entertainment and non-essential purchases.</p>
                        </div>
                        <div className='rounded-lg bg-blue-50 p-4'>
                            <h4 className='text-xl font-medium'>Investments</h4>
                            <p className='text-gray-500'>Allocate funds towards future financial growth.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpendSection;
