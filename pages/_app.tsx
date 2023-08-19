import '../styles/globals.css';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';

const progress = new ProgressBar({
    size: 4,
    color: 'white',
    className: 'z-50 bar-of-progress',
    delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider enableSystem={false} attribute='class'>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                    <Analytics />
                </Layout>
            </SessionProvider>
        </ThemeProvider>
    );
}

export default App;
