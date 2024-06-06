import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.2.0/uicons-thin-rounded/css/uicons-thin-rounded.css' />
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.2.0/uicons-regular-rounded/css/uicons-regular-rounded.css' />
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.3.0/uicons-bold-rounded/css/uicons-bold-rounded.css' />
                <link rel='icon' href='/logo.png' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' />
                <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet' />
                <link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet' />
            </Head>
            <body className='bg-primary'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
