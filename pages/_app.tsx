import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import { SITE_CONFIG } from '@/config/site';
import { SearchProvider } from '@/contexts/SearchContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon configuration */}
        <link rel="icon" type="image/png" sizes="32x32" href={SITE_CONFIG.ui.logo.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={SITE_CONFIG.ui.logo.src} />
        <link rel="apple-touch-icon" sizes="180x180" href={SITE_CONFIG.ui.logo.src} />
      </Head>
      <Component {...pageProps} />
    </SearchProvider>
  );
}