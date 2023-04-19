import { useState } from 'react';
import { spendingCategories } from '../data/constants';
import NewTransaction from './NewTransaction';
import Receipt from './Receipt';

const Spend = ({ receipts }: any) => {
    console.log(receipts);

    const [newTransactionIsOpen, setNewTransactionIsOpen] = useState(false);

    return (
        <div className='flex h-screen w-screen flex-col p-6 pl-20'>
            <NewTransaction isOpen={newTransactionIsOpen} createTransaction={setNewTransactionIsOpen} closeForm={() => setNewTransactionIsOpen(false)} />
            <div className='flex space-x-6'>
                <div>
                    <span className='text-3xl font-semibold'>Spending this month: $</span>
                    <div className='mt-4 h-80 w-[700px] rounded-lg border'>Line Chart</div>
                </div>
                <div>
                    <span>Spending Habits</span>
                    <div className='mb-4 h-12 w-full rounded-md border'></div>
                    <div className='grid grid-cols-2 gap-2 lg:grid-cols-5'>
                        {spendingCategories.map((category) => (
                            <div className='flex h-32 w-32 items-center justify-center rounded-lg border'>{category}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div>Recent Receipts</div>
            {receipts.map((receipt: any) => (
                <Receipt key={receipt.id} receipt={receipt} />
            ))}
            <button className='h-8 w-48 rounded-full border' onClick={() => setNewTransactionIsOpen(true)}>
                + Add Transaction
            </button>
        </div>
    );
};

export default Spend;
