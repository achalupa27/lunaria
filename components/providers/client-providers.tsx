'use client';

import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider enableSystem={false} attribute='class'>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    {children}
                    <Analytics />
                </Provider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
