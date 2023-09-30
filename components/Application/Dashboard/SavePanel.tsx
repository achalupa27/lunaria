import { Doughnut } from 'react-chartjs-2';
import SaveReceipt from '../Save/SaveReceipt';
import { useEffect, useState } from 'react';
import NewSave from '../Save/NewSave';
import { useAppSelector } from '@/redux/hooks';
import { selectSaving } from '@/redux/slices/saveSlice';
import { useTheme } from 'next-themes';
import Image from 'next/image';

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

const SavePanel = () => {
    const saves = useAppSelector(selectSaving);
    const [newSaveIsOpen, setNewSaveIsOpen] = useState(false);

    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='ms-card py-4 px-4'>
            <NewSave isOpen={newSaveIsOpen} closeForm={() => setNewSaveIsOpen(false)} />

            <div className='flex justify-between pb-4'>
                <div className='flex items-center'>
                    <Image src={theme === 'light' ? '/save-dark.svg' : '/save.svg'} alt='' height={48} width={48} />
                    <h3 className='text-4xl text-ld-blue dark:text-l-blue'>Saving</h3>
                </div>
                <button className='h-10 w-48 rounded-md border border-ld-blue text-ld-blue transition duration-200 hover:bg-ld-blue hover:text-primary dark:border-l-blue dark:text-l-blue dark:hover:bg-l-blue dark:hover:text-primary' onClick={() => setNewSaveIsOpen(true)}>
                    + Saving
                </button>
            </div>
            {saves.length === 0 ? (
                <div>Record a saving event to get started.</div>
            ) : (
                <div className='flex justify-between'>
                    <div>
                        <Doughnut options={options} data={saveDoughnut} />
                    </div>
                    <div className='h-[200px] space-y-2 overflow-y-auto'>
                        {saves.map((save: Save) => (
                            <SaveReceipt key={save.id} save={save} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavePanel;
