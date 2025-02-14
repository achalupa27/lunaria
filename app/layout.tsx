'use client';

import '../styles/globals.css';
import '../styles/index.css';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Layout from '@/components/website/layout/page-layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <link rel='icon' href='/logo.svg' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
            </head>
            <body className='bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50'>
                <ThemeProvider enableSystem={false} attribute='class'>
                    <QueryClientProvider client={queryClient}>
                        <Layout>
                            <Provider store={store}>
                                {children}
                                <Analytics />
                            </Provider>
                        </Layout>
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
