import React from 'react';

type FeatureRowProps = {
    description: string;
    includedFree: string | boolean;
    includedProfessional: string | boolean;
};

const FeatureRow = ({ description, includedFree, includedProfessional }: FeatureRowProps) => {
    const renderIncludedValue = (value: string | boolean) => {
        if (typeof value === 'boolean') {
            return value ? <i className='fi fi-rr-check text-lg leading-[0px]' /> : null;
        }
        return value; // If it's a string, render it as is
    };

    return (
        <div className='flex items-center rounded p-2 px-3 transition duration-200 hover:bg-white'>
            <div className='flex-1'>{description}</div>
            <div className='flex-1 text-center'>{renderIncludedValue(includedFree)}</div>
            <div className='flex-1 text-center'>{renderIncludedValue(includedProfessional)}</div>
        </div>
    );
};

export default FeatureRow;
