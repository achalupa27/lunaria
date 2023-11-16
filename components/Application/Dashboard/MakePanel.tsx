import React, { useEffect, useState } from 'react';
import MakeReceipt from '../Make/MakeReceipt';
import { Doughnut } from 'react-chartjs-2';
import NewMake from '../Make/MakeForm';
import { useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
};

export const makeDoughnut = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['#99f5d1', '#99f5d1', '#99f5d1', '#99f5d1', '#99f5d1', '#99f5d1'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 5,
        },
    ],
};

const MakePanel = () => {
    const makes = useAppSelector(selectMaking);
    const [newMakeIsOpen, setNewMakeIsOpen] = useState(false);

    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div className='ms-card px-4 py-4'>
            <NewMake isOpen={newMakeIsOpen} closeForm={() => setNewMakeIsOpen(false)} />

            <div className='flex justify-between pb-4'>
                <div className='flex items-center'>
                    <Image src={theme === 'light' ? '/make-dark.svg' : '/make.svg'} alt='' height={48} width={48} />
                    <h3 className='text-4xl text-ld-green dark:text-l-green'>Making</h3>
                </div>
                <button className='h-10 w-48 rounded-lg border border-ld-green text-ld-green transition duration-200 hover:bg-ld-green hover:text-primary dark:border-l-green dark:text-l-green dark:hover:bg-l-green dark:hover:text-primary' onClick={() => setNewMakeIsOpen(true)}>
                    + Making
                </button>
            </div>
            {makes.length === 0 ? (
                <div>Record an income event to get started.</div>
            ) : (
                <div className='flex justify-between'>
                    {/* <div className='h-fit'>
                        <Doughnut options={options} data={makeDoughnut} />
                    </div> */}
                    <div className='h-[200px] space-y-2 overflow-y-auto'>
                        {makes.map((make: Make) => (
                            <MakeReceipt key={make._id} make={make} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MakePanel;
