const ItemForm = ({ control, index, remove, entry }: any) => {
    return (
        <div className='flex items-center'>
            <div className='space-y-1 rounded-sm border p-1 [&>div>div]:flex [&>div>div]:items-center [&>div]:space-x-1'>
                <div className='flex items-center justify-between '>
                    <div className='basic-button w-32'>
                        <i className='fi fi-tr-hand-holding-usd' />
                        <input {...control.register(`entries[${index}].order_price`)} step='any' placeholder='Order Price' type='number' className='input-field' />
                    </div>
                    <div className='basic-button w-32'>
                        <i className='fi fi-tr-handshake' />
                        <input {...control.register(`entries[${index}].fill_price`)} step='any' placeholder='Fill Price' type='number' className='input-field' />
                    </div>
                    <div className='basic-button w-24'>
                        <i className='fi fi-tr-coins' />
                        <input {...control.register(`entries[${index}].size`)} step='any' placeholder='Size' type='number' className='input-field' />
                    </div>
                </div>
                <input hidden readOnly {...control.register(`entries[${index}].entry_id`)} value={index} placeholder='ID' type='number' />
            </div>
            <i
                className='fi fi-tr-square-minus ml-2 cursor-pointer text-xl transition duration-200 hover:text-red-600'
                onClick={() => {
                    remove(index);
                }}
            ></i>
        </div>
    );
};

export default ItemForm;
