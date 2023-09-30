type Props = {
    spend: Spend;
};

const Receipt = ({ spend }: Props) => {
    return (
        <div className='flex w-60 justify-between space-x-8 rounded-lg border border-l-yellow p-2 px-4 dark:text-l-yellow'>
            <div>{spend.store}</div>
            <div>{spend.items?.length}</div>
            <div>${spend.total}</div>
        </div>
    );
};

export default Receipt;
