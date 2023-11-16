import { useState } from 'react';
import SpendForm from './SpendForm';

type Props = {
    spend: Spend;
};

const SpendReceipt = ({ spend }: Props) => {
    const [spendFormIsOpen, setSpendFormIsOpen] = useState(false);

    return (
        <div key={spend._id}>
            <div onClick={() => setSpendFormIsOpen(true)} className='flex w-60 justify-between space-x-8 rounded-lg border border-l-yellow p-2 px-4 hover:bg-l-yellow/30 dark:text-l-yellow'>
                <div>{spend.item}</div>
                <div>${spend.cost}</div>
            </div>
            <SpendForm isOpen={spendFormIsOpen} closeForm={() => setSpendFormIsOpen(false)} spendToEdit={spend} />
        </div>
    );
};

export default SpendReceipt;
