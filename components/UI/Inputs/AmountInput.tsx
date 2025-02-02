import { DollarSign } from 'lucide-react';

const AmountInput = () => {
    return (
        <div className='flex w-full rounded-lg border p-2'>
            <DollarSign className='opacity-50' />
            <input className='flex-1' type='number' />
            <select className='bg-transparent'>
                <option>CAD</option>
                <option>USD</option>
                <option>MXN</option>
            </select>
        </div>
    );
};

export default AmountInput;
