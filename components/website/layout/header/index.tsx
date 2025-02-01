'use client';

import LeftSection from './left-section';
import MiddleSection from './middle-section';
import RightSection from './right-section';

const Header = () => {
    return (
        <header className='relative z-50 mx-auto flex h-24 max-w-screen-2xl items-center justify-between border-b px-8 py-6 dark:border-b-0'>
            <LeftSection />
            <MiddleSection />
            <RightSection />
        </header>
    );
};

export default Header;
