import React from 'react';

const Receipt = ({ receipt }: any) => {
    return (
        <div className='flex justify-between space-x-8 rounded-lg border p-2'>
            <div>{receipt.store}</div>
            <div>${receipt.cost}</div>
        </div>
    );
};

export default Receipt;
