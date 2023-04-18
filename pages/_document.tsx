import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-thin-rounded/css/uicons-thin-rounded.css' />
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
                <link rel='icon' href='/logo.png' />
                <title>Moneyshield</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
