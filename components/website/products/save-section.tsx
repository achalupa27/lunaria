const SaveSection = () => {
    return (
        <section className='py-16 text-center'>
            <h2 className='mb-8 text-4xl font-semibold'>Build Your Savings</h2>
            <p className='text-lg text-gray-600'>Set aside money for the future and watch your savings grow over time.</p>
            <div className='mt-12 flex justify-center'>
                <div className='w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-8 shadow-md'>
                    <h3 className='mb-4 text-2xl font-semibold'>Smart Saving Strategies</h3>
                    <p className='text-lg text-gray-600'>Automatically allocate a portion of your income to savings goals.</p>
                    <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
                        <div className='rounded-lg bg-blue-50 p-4'>
                            <h4 className='text-xl font-medium'>Emergency Fund</h4>
                            <p className='text-gray-500'>Be prepared for unexpected expenses.</p>
                        </div>
                        <div className='rounded-lg bg-green-50 p-4'>
                            <h4 className='text-xl font-medium'>Investment</h4>
                            <p className='text-gray-500'>Grow your wealth over time with smart investing.</p>
                        </div>
                        <div className='rounded-lg bg-yellow-50 p-4'>
                            <h4 className='text-xl font-medium'>Big Purchases</h4>
                            <p className='text-gray-500'>Plan ahead for major expenses.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaveSection;
