import BrandInfo from './brand-info';
import Links from './links';

const Footer = () => {
    return (
        <footer className='mx-auto flex w-[90%] max-w-screen-2xl p-8 lg:p-24'>
            <BrandInfo />
            <Links />
        </footer>
    );
};

export default Footer;
