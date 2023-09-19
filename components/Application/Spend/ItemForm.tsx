import { spendingCategories } from '../../../data/constants';

const ItemForm = ({ control, index, remove, item }: any) => {
    return (
        <div className='relative flex items-center'>
            <div className='py-1 [&>div>div]:flex [&>div>div]:items-center'>
                <div className='flex w-fit items-center justify-between'>
                    <i
                        className='fi fi-rr-cross-small duration-50 mr-4 cursor-pointer text-gray-400 transition hover:text-red-500'
                        onClick={() => {
                            remove(index);
                        }}
                    />
                    <div className='space-x-2'>
                        <i className='fi fi-rr-hand-holding-box' />
                        <input {...control.register(`items[${index}].item`)} step='any' placeholder='Item' type='number' className='input-field w-40' />
                    </div>
                    <div className='space-x-2'>
                        <i className='fi fi-rr-dollar' />
                        <input {...control.register(`items[${index}].price`)} step='any' placeholder='Price' type='number' className='input-field w-16' />
                    </div>
                    <div className='mr-2 space-x-2'>
                        <i className='fi fi-rr-apps-sort' />
                        <select {...control.register(`items[${index}].category`)} step='any' placeholder='Category' type='text' className='input-field w-20'>
                            {spendingCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <input hidden readOnly {...control.register(`items[${index}].item_id`)} value={index} placeholder='ID' type='number' />
            </div>
        </div>
    );
};

export default ItemForm;
