const MakeSection = () => {
    return (
        <section className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Make Smarter Financial Decisions</h2>
            <p className='mx-auto max-w-2xl text-lg text-gray-600'>Lunaria helps you take control of your finances by providing clear insights into your income, savings, and spending habits. Make informed choices to grow your wealth and achieve financial freedom.</p>
            <div className='mt-12 flex justify-center'>
                <div className='grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-md'>
                        <h3 className='mb-3 text-2xl font-semibold'>Set Goals</h3>
                        <p className='text-gray-500'>Define your financial goals and track your progress with ease.</p>
                    </div>
                    <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-md'>
                        <h3 className='mb-3 text-2xl font-semibold'>Optimize Spending</h3>
                        <p className='text-gray-500'>Identify unnecessary expenses and maximize your savings.</p>
                    </div>
                    <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-md'>
                        <h3 className='mb-3 text-2xl font-semibold'>Invest Wisely</h3>
                        <p className='text-gray-500'>Get recommendations on how to grow your wealth efficiently.</p>
                    </div>
                    <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-md'>
                        <h3 className='mb-3 text-2xl font-semibold'>Stay on Track</h3>
                        <p className='text-gray-500'>Use insights and reports to maintain financial discipline.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeSection;
