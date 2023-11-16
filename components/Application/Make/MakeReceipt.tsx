import { useState } from 'react';
import MakeForm from './MakeForm';

type Props = {
    key: string | undefined;
    make: Make;
};

const MakeReceipt = ({ make }: Props) => {
    const [makeFormIsOpen, setMakeFormIsOpen] = useState(false);

    return (
        <div key={make._id}>
            <div onClick={() => setMakeFormIsOpen(true)} className='flex w-60 justify-between space-x-8 rounded-lg border border-l-green p-2 px-4 hover:bg-l-green/30 dark:text-l-green'>
                <div>{make.source}</div>
                <div>${make.amount}</div>
            </div>
            <MakeForm isOpen={makeFormIsOpen} closeForm={() => setMakeFormIsOpen(false)} makeToEdit={make} />
        </div>
    );
};

export default MakeReceipt;
