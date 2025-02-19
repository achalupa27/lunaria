import BrandInfo from './components/brand-info';
import Links from './components/links';

const Footer = () => {
    return (
        <footer className='mx-auto flex-col max-w-screen-2xl flex w-full items-center justify-center p-4 lg:p-24 mt-12'>
            <BrandInfo />
            <Links />
        </footer>
    );
};

export default Footer;
