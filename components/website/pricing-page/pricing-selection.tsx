'use client';

import { useState } from 'react';
import Auth from '../auth';
import SignUp from '../auth/sign-up';
import FreeTable from './components/pricing-tables/free-table';
import PremiumTable from './components/pricing-tables/premium-table';
import ProTable from './components/pricing-tables/pro-table';
import TermChanger from './components/term-changer';

const PricingSelection = () => {
    const [authView, setAuthView] = useState<'login' | 'signup'>('signup');
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [term, setTerm] = useState<'Monthly' | 'Yearly'>('Yearly');

    const handleSignUpClick = () => {
        setAuthView('signup');
        setIsAuthOpen(true);
    };

    const handleSignUpSuccess = () => {
        // setAuthView('login');
    };

    return (
        <>
            <div className='flex flex-col w-full items-center justify-center'>
                <TermChanger term={term} setTerm={setTerm} />
            </div>
            <div className='mt-16 flex flex-wrap justify-center gap-8 2xl:gap-12'>
                <FreeTable onSignUpClick={handleSignUpClick} />
                <ProTable term={term} onSignUpClick={handleSignUpClick} />
                <PremiumTable term={term} onSignUpClick={handleSignUpClick} />
                {/* 
                <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
                    {authView === 'signup' && <SignUp onSuccess={handleSignUpSuccess} onLoginClick={() => setAuthView('login')} />}
                </Auth> */}
            </div>
        </>
    );
};

export default PricingSelection;
