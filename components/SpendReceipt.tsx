type Props = {
    spend: Spend;
};

const Receipt = ({ spend }: Props) => {
    return (
        <div className='flex justify-between space-x-8 rounded-lg border p-2'>
            <div>{spend.store}</div>
            <div>${spend.amount}</div>
        </div>
    );
};

export default Receipt;
