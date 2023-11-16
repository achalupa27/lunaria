import { useState } from 'react';
import SaveForm from './SaveForm';

type Props = {
    save: Save;
};

const SaveReceipt = ({ save }: Props) => {
    const [saveFormIsOpen, setSaveFormIsOpen] = useState(false);

    return (
        <div key={save._id}>
            <div onClick={() => setSaveFormIsOpen(true)} className={`${save.type === 'Deposit' ? 'border-l-blue text-l-blue hover:bg-l-blue/30' : 'border-red-200 text-red-200 hover:bg-red-200/30'} flex w-60 justify-between space-x-8 rounded-lg border p-2 px-4`}>
                <div>{save.type}</div>
                <div>${save.amount}</div>
            </div>
            <SaveForm isOpen={saveFormIsOpen} closeForm={() => setSaveFormIsOpen(false)} saveToEdit={save} />
        </div>
    );
};

export default SaveReceipt;
