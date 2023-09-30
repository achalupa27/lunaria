type Props = {
    key: string | undefined;
    make: Make;
};

const MakeReceipt = ({ key, make }: Props) => {
    return (
        <div className='flex w-60 justify-between space-x-8 rounded-lg border border-l-green p-2 px-4 dark:text-l-green'>
            <div>{make.source}</div>
            <div>${make.amount}</div>
        </div>
    );
};

export default MakeReceipt;
