const ItemForm = ({ control, index, remove, item }: any) => {
    return (
        <div className='flex items-center'>
            <div className='space-y-1 rounded-md border border-primary/50 p-1 dark:border-primary/50 [&>div>div]:flex [&>div>div]:items-center [&>div]:space-x-1'>
                <div className='flex items-center justify-between '>
                    <button className='basic-button w-32'>
                        <i className='fi fi-tr-hand-holding-usd' />
                        <input {...control.register(`items[${index}].order_price`)} step='any' placeholder='Item' type='number' className='input-field w-24' />
                    </button>
                    <button className='basic-button w-16'>
                        <i className='fi fi-tr-handshake' />
                        <input {...control.register(`items[${index}].fill_price`)} step='any' placeholder='Price' type='number' className='input-field w-16' />
                    </button>
                    <button className='basic-button w-24'>
                        <i className='fi fi-tr-coins' />
                        <input {...control.register(`items[${index}].size`)} step='any' placeholder='Necessary?' type='number' className='input-field w-24' />
                    </button>
                </div>
                <input hidden readOnly {...control.register(`items[${index}].item_id`)} value={index} placeholder='ID' type='number' />
            </div>
            <i
                className='fi fi-tr-square-minus ml-2 cursor-pointer text-xl text-primary/50 transition duration-200 hover:text-red-600 dark:text-primary/50'
                onClick={() => {
                    remove(index);
                }}
            />
        </div>
    );
};

export default ItemForm;
