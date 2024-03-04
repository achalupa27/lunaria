import React from 'react';

interface InputProps {
    children: React.ReactNode;
}

const Input = ({ children }: InputProps) => {
    return <div className='flex w-full items-center space-x-2'>{children}</div>;
};

export default Input;
