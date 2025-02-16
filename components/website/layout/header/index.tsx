'use client';

import LeftSection from './components/left-section';
import MiddleSection from './components/middle-section';
import RightSection from './components/right-section';

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
