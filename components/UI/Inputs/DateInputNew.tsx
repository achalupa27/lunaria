import { Calendar } from 'lucide-react';
import React from 'react';

const DateInputNew = () => {
    return (
        <div className='flex w-full rounded-lg border p-2'>
            <Calendar className='opacity-50' />
            <input className='flex-1' type='number' />
        </div>
    );
};

export default DateInputNew;
