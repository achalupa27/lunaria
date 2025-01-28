type Props = {
    title: string;
    titleStyle: string;
    buttonText?: string;
    buttonStyle?: string;
    onClick?: any;
};

const PageHeader = ({ title, titleStyle, buttonText, buttonStyle, onClick }: Props) => {
    return (
        <div className='flex justify-between'>
            <div className={`text-[40px] font-medium ${titleStyle}`}>{title}</div>
            <button className={`my-2 w-48 rounded-lg ${buttonStyle} p-2 font-medium text-primary`} onClick={onClick}>
                {buttonText}
            </button>
        </div>
    );
};

export default PageHeader;
