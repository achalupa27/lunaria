import '../styles/globals.css';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Layout from '@/components/website/layout/page-layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const progress = new ProgressBar({
    size: 4,
    color: 'white',
    className: 'z-50 bar-of-progress',
    delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider enableSystem={false} attribute='class'>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Provider store={store}>
                        <Component {...pageProps} />
                        <Analytics />
                    </Provider>
                </Layout>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
