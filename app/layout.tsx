import '../styles/globals.css';
import '../styles/index.css';
import PageLayout from '@/components/website/layout/page-layout';
import { defaultMetadata } from './metadata.config';
import ClientProviders from '@/components/providers/client-providers';
import { inter } from './fonts';

export const metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 ${inter.variable}`}>
                <ClientProviders>
                    <PageLayout>{children}</PageLayout>
                </ClientProviders>
            </body>
        </html>
    );
}
