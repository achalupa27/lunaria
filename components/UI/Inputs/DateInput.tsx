import Input from './Input';
import InputLabel from './InputLabel';

type Props = {
    register: any;
    label: string;
    registerValue: string;
    isRequired: boolean;
    labelWidth?: string | undefined;
    today?: boolean;
};

const DateInput = ({ register, label, registerValue, isRequired, labelWidth, today }: Props) => {
    // Calculate today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split('T')[0];

    return (
        <Input>
            <InputLabel label={label} isRequired={isRequired} width={labelWidth} />
            <input {...register(registerValue)} type='date' placeholder='Select a date' className='picker w-full bg-transparent pl-1 text-right' required={isRequired} defaultValue={today ? todayDate : undefined} />
        </Input>
    );
};

export default DateInput;
