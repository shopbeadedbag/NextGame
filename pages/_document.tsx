import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_CONFIG } from '@/config/site';

export default function Document() {
  return (
    <Html lang="en-US" className="dark">
      <Head>
        <meta charSet="utf-8" />

        {/* Favicon configuration */}
        <link rel="icon" type="image/png" sizes="32x32" href={SITE_CONFIG.ui.logo.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={SITE_CONFIG.ui.logo.src} />
        <link rel="apple-touch-icon" sizes="180x180" href={SITE_CONFIG.ui.logo.src} />
        <link rel="mask-icon" href={SITE_CONFIG.ui.logo.src} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="stylesheet" type="text/css" href="/resources/css/swiper.css" />
        <link href="/resources/css/style.min.css" rel="stylesheet" type="text/css" />
      </Head>
      <body className="__className_d65c78 __variable_05e5f9">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}