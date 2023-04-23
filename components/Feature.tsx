type Props = {
    img: any;
    name: string;
    description: string;
    comingSoon: boolean;
};

function Feature({ img, name, description, comingSoon }: Props) {
    return (
        <div>
            {/* <div>
                <img src={img}></img>
            </div> */}
            <div className='min-w-2xl max-w-2xl'>
                {comingSoon && <div className='button-highlight'>COMING SOON</div>}
                <div className='text-4xl font-medium'>{name}</div>
                <div>{description}</div>
            </div>
        </div>
    );
}

export default Feature;
