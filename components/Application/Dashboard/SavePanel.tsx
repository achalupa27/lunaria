import { Doughnut } from 'react-chartjs-2';
import SaveReceipt from '../Save/SaveReceipt';
import { useState } from 'react';
import NewSave from '../Save/NewSave';

export const saveDoughnut = {
    labels: ['Withdrawals', 'Deposits'],
    datasets: [
        {
            label: 'Amount: ',
            data: [12, 19],
            backgroundColor: ['rgb(252, 165, 165)', 'rgb(147, 197, 253)'],
            borderWidth: 0,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
};
const SavePanel = ({ saves }: { saves: Save[] }) => {
    const [savesIn, setSaves] = useState(saves);
    const [newSaveIsOpen, setNewSaveIsOpen] = useState(false);

    return (
        <div className='ms-card py-4 px-8'>
            <NewSave isOpen={newSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} saves={savesIn} setSaves={setSaves} />
            <div className='flex justify-between pb-4'>
                <h3 className='text-4xl text-blue-300'>Saving</h3>
                <button className='w-48 rounded-md border border-blue-300 text-blue-300 transition duration-200 hover:bg-blue-300 hover:text-primary' onClick={() => setNewSaveIsOpen(true)}>
                    + Saving
                </button>
            </div>
            <div className='flex justify-between'>
                <div>
                    <Doughnut options={options} data={saveDoughnut} />
                </div>
                <div className='flex max-h-fit flex-col space-y-2 overflow-y-auto'>
                    {savesIn.map((save: Save) => (
                        <SaveReceipt key={save.id} save={save} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavePanel;
