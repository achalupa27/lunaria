import React from 'react';

const Receipt = ({ receipt }: any) => {
    return (
        <div>
            <div>{receipt.store}</div>
            <div>{receipt.cost}</div>
            <div>{receipt.category}</div>
            {receipt.items ? (
                receipt.items.map((item: any) => (
                    <>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default Receipt;
