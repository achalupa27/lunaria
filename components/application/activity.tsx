'use client';

import Home from '../../features/home';
import Make from '../../features/make';
import Save from '../../features/save';
import Spend from '../../features/spend';
import { useAppSelector } from '@/redux/hooks';
import { selectTab } from '@/redux/slices/tab-slice';
import Settings from './settings';
import { Suspense } from 'react';
import Loader from '../ui/loader';
import { ErrorBoundary } from 'react-error-boundary';
import Transactions from '../../features/transactions';
import Reports from '@/features/reports';

const Activity = () => {
    const tab = useAppSelector(selectTab);

    if (tab === 'Home')
        return (
            <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
                <Suspense fallback={<Loader />}>
                    <Home />
                </Suspense>
            </ErrorBoundary>
        );
    else if (tab === 'Make')
        return (
            <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
                <Suspense fallback={<Loader />}>
                    <Make />
                </Suspense>
            </ErrorBoundary>
        );
    else if (tab === 'Save')
        return (
            <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
                <Suspense fallback={<Loader />}>
                    <Save />
                </Suspense>
            </ErrorBoundary>
        );
    else if (tab === 'Spend')
        return (
            <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
                <Suspense fallback={<Loader />}>
                    <Spend />
                </Suspense>
            </ErrorBoundary>
        );
    else if (tab === 'Reports')
        return (
            <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
                <Suspense fallback={<Loader />}>
                    <Reports />
                </Suspense>
            </ErrorBoundary>
        );
    else if (tab === 'Transactions')
        return (
            <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
                <Suspense fallback={<Loader />}>
                    <Transactions />
                </Suspense>
            </ErrorBoundary>
        );
    else if (tab === 'Settings')
        return (
            <ErrorBoundary fallbackRender={({ error }) => <div>Error: {error.message}</div>}>
                <Suspense fallback={<Loader />}>
                    <Settings />
                </Suspense>
            </ErrorBoundary>
        );

    return <div>Error</div>;
};

export default Activity;
